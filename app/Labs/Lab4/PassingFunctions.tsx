"use client"

// Function passed in as a parameter
export default function PassingFunctions(
    { theFunction }: { theFunction: () => void }) {
    return (
        <div>
            <h2>Passing Functions</h2>
            <button
                onClick={theFunction}     // Invoking function with no arguments
                className="btn btn-primary"
            >
                Invoke the Function
            </button>
            <hr/>
        </div>
    );
}