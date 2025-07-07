export const items = [
    {
        id : 1,
        title : "Dashboard"
    },
    {
        id : 2,
        title : "Tweets"
    },
    {
        id : 3,
        title : "Youtube"
    },
    
]

export default function Sidebar(){
    return <div className="h-screen bg-white w-72 p-4">
            <div className="p-4">
                <h1>BrainLogo</h1>
            </div>
        <div className="bg-gray-200 rounded-sm p-4 w-full h-full">
            {
               items.map(({id,title}) => (
                    <div
                        className="cursor-pointer"
                        key={id}>
                        {title}
                    </div>
               ))
            }
        </div>
    </div>
}