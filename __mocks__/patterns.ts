const mockPatterns = [
    {
        id: "1",
        createdAt: "2023-10-25T19:46:37.781Z" as unknown as Date,
        title: "Smol Boi",
        gridHeight: 3,
        gridWidth: 3,
        pixels: '[["#0000FF",null,"#0000FF"],[null,null,null],[null,"#0000FF",null]]',
    },
    {
        title: "Anotha",
        gridHeight: 5,
        gridWidth: 5,
        pixels: '[["#0000FF",null,"#0000FF", null,"#0000FF"],[null,null, null,null,null],[null,"#0000FF",null,"#0000FF",null]],[null,null, null,null,null],[null,"#0000FF",null,"#0000FF",null]',
    },
    {
        title: "Empty One",
        gridHeight: 3,
        gridWidth: 3,
        pixels: '[[null,null,null],[null,null,null],[null,"#0000FF",null]]',
    },
]
export default mockPatterns
