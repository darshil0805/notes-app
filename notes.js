const chalk = require('chalk')
const fs = require('fs')
// const getNotes = function(){
//     return "Your notes..."
// }

const listNotes = () =>{
    console.log(chalk.inverse("Your notes"))
    const notes = loadNotes()
    notes.forEach((note) => console.log(note.title))
}

const addNote = (title,body) => {
     const notes = loadNotes()
    
     const duplicateNote = notes.find((note) => note.title === title)

     if(!duplicateNote){
        notes.push({
            title:title,
            body:body
        })
        console.log(chalk.green.inverse('New note added'))
    }
    else{
        console.log(chalk.red.inverse('Title is taken'))
    }
     
     saveNotes(notes)
     //console.log(notes)
}

const removeNote = (title) => {
    const notes = loadNotes()

    const output = notes.filter((note) => note.title != title)
    
    if(notes.length === output.length){
        console.log(chalk.red.inverse('No note found'))
    }
    else{
        console.log(chalk.green.inverse('Note removed'))
    }
    saveNotes(output)

}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if(note){
        console.log(chalk.italic.bold(note.title) + " : " + note.body)
    }
    else{
        console.log(chalk.red.inverse("Note with title " + title + " does not exist"))   
    }
}

const loadNotes = () => {
    
    try{
        const buffer = fs.readFileSync('notes.json')
        const dataJSON = buffer.toString()
        return JSON.parse(dataJSON)
    }catch(e){
        return []
    }
    
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}

module.exports = {
    addNote:addNote,
    removeNote:removeNote,
    listNotes : listNotes,
    readNote : readNote
} 