const baseUrl = 'http://localhost:3001/anecdotes'


export const getAnecdotes = async ()=>{
    const resp = await fetch(baseUrl)
    if(!resp.ok){
        throw new Error("Failed to Fetch anecdotes")
    }
    return await resp.json()
}

export const createAnecdote = async (anecdote) => {
    const resp= await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(anecdote)
    })
    if(!resp.ok){
        throw new Error("Failed to create anecdote")
    }   
    return await resp.json()
}

export const updateAnecdote = async (anecdote) => {
    const resp= await fetch(`${baseUrl}/${anecdote.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(anecdote)
    })
    if(!resp.ok){
        throw new Error("Failed to update anecdote")
    }   
    return await resp.json()
}
