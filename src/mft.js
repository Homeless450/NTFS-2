let fs = require('fs')
let { MFT, SECTION } = require('./table.js')

class mft {
    constructor() {
        this.data = fs.readFileSync(__dirname + '/MFT.bin').slice(4)
        this.offset = 0
        this.header = {}

        MFT.forEach(([name, offset, type]) => this.header[name] = this.getData(offset, this.getType(type)))
        this.attributes = this.getAttribytes(this.header['Offset to first attribute'])
    }
    getAttribytes(length) {
        let attributes = []
        let identifier
        while (this.data.length) {
            try {
                identifier = this.getData(length - this.offset, 4)
                length = this.getData(2, 2) - 2 + this.offset
                if (isNaN(length) || length - this.offset <= 0) break
                attributes.push(this.getAttribyte(identifier, length - this.offset + 2))
            } catch (e) {
                console.log('Unexpected end of file')
                break;
            }
        }
        return attributes;
    }
    getType = str => isNaN(str) ? ({ 'short': 1, 'int': 2, 'long': 4 }[str]) : str
    getAttribyte(identifier, length) {
        let attribute = {}
        let setAttribute = ([name, offset, type]) => attribute[name] = this.getData(offset, this.getType(type))

        attribute[SECTION[0][0]] = identifier
        attribute[SECTION[1][0]] = length

        SECTION.slice(2, 7).forEach(setAttribute)
        let resident = attribute['Non-resident flag'] ? 'resident' : 'non_resident'
        SECTION[7][resident].forEach(setAttribute)

        return attribute
    }
    getData(offset, bytes) {
        this.offset += offset
        let data = this.data.slice(0, offset)
        this.data = this.data.slice(offset)
        return parseInt(data.slice(-bytes).reverse().toString('hex'), 16)
    }
    toString = () => ({ header: this.header, attributes: this.attributes })
}

module.exports = mft