import { ChartTestType } from "@/types/chart"

const mockCharts: ChartTestType[] = [
    {
        id: "1",
        createdAt: "2023-10-25T19:46:37.781Z" as unknown as Date,
        title: "Smol Boi",
        gridHeight: 3,
        gridWidth: 3,
        pixels: '[["#0000FF",null,"#0000FF"],[null,null,null],[null,"#0000FF",null]]',
        userId: "1",
    },
    {
        id: "2",
        createdAt: "2023-10-25T19:46:37.781Z" as unknown as Date,
        title: "Anotha",
        gridHeight: 5,
        gridWidth: 5,
        pixels: '[["#0000FF",null,"#0000FF", null,"#0000FF"],[null,null, null,null,null],[null,"#0000FF",null,"#0000FF",null]],[null,null, null,null,null],[null,"#0000FF",null,"#0000FF",null]',
        userId: "1",
    },
    {
        id: "3",
        createdAt: "2023-10-25T19:46:37.781Z" as unknown as Date,
        title: "Empty One",
        gridHeight: 3,
        gridWidth: 3,
        pixels: '[[null,null,null],[null,null,null],[null,"#0000FF",null]]',
        userId: "1",
    },
]
export default mockCharts
