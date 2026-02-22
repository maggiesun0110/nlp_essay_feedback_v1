//presentational component (no data)
function Results({ result }) {
    if (!result) return null;

    return (
        <div>
            <h2> Results </h2>
            <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
    );
}

export default Results;