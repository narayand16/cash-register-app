interface Props {
    noteCounts: { [k: string]: number }
}

export default function DenominationsTable({ noteCounts }: Props) {
    const denominations = [2000, 500, 200, 100, 50, 20, 10, 5, 2, 1];

    return <table className="table-auto my-5">
        <thead>
            <tr>
                <th>Denominations</th>
                {denominations.map((item, index) => {
                    {
                        if (noteCounts[item] && item) {
                            return <td key={index}>{item}</td>
                        }
                    }
                })}
            </tr>
            <tr>
                <th>No. of notes</th>
                {denominations.map((item: number, index) => {
                    {
                        if (noteCounts[item]) {
                            return <td key={index}>{noteCounts[item]}</td>
                        }
                    }
                })}
            </tr>
        </thead>
    </table>
}