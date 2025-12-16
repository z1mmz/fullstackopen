const baseUrl = 'http://localhost:3001/anecdotes'


export const getAnecdotes = async ()=>{
    const resp = await fetch(baseUrl)
    if(!resp.ok){
        throw new Error("Failed to Fetch anecdotes")
    }
    return await resp.json()
}
