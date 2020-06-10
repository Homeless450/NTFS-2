let MFT = [
    ['Offset to fixup array', 1, 'short'],
    ['Number of entries in fixup array', 2, 'short'],
    ['$LogFile sequence number', 4, 3],
    ['Sequence value', 6, 'short'],
    ['Link count', 2, 'short'],
    ['Offset to first attribute', 2, 'short'],
    ['Flags', 2, 'short'],
    ['Used size of MFT entry', 3, 'int'],
    ['Allocated size of MFT entry', 4, 'int'],
    ['File reference to base record', 4, 'long'],
    ['Next attribute identifier', 8, 'int']
]

let SECTION = [
    ['Attribute Type Identifier', undefined, 'int'],
    ['Length of Attribute', 4, 'int'],
    ['Non-resident flag', 3, 'short'],
    ['Lenght of name', 1, 'short'],
    ['Offset to name', 1, 'short'],
    ['Flags', 2, 'short'],
    ['Attribute Identifier', 2, 'short'],
    {
        resident: [
            ['Size of content', 2, 'int'],
            ['Offset to content', 4, 'short']
        ],
        non_resident: [
            ['Starting Virtual Cluster Number of the runlist', 2, 'long'],
            ['Ending Virtual Cluster Number of the runlist', 8, 'long'],
            ['Offset to the runlist', 8, 'short'],
            ['Compression unit size', 2, 'short'],
            ['unused', 2, 'int'],
            ['Allocated size of the attribute content', 4, 'long'],
            ['Actual size of attribute content', 8, 'long'],
            ['Initialized size of the attribute content', 8, 'long'],
        ]
    },
    ['Empty1', 2, 'short']
]

module.exports = { MFT, SECTION }