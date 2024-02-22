import { useState,useEffect } from "react";
import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";
import axios from "axios";


function App(){
    const [books,setBooks]=useState([]);

    const fectBooks = async()=>{
            const response =await axios.get("http://localhost:3001/books");
            setBooks(response.data);
    }
    useEffect(()=>{
        fectBooks();},
    []);


    const createBook=async(title)=>{
  const response =  await axios.post("http://localhost:3001/books",{
    title:title
  })  
  const updatedBooks=[
    ...books,
     response.data ];
     setBooks(updatedBooks);

//             const updatedBooks=[
//                 ...books,{id:Math.round(Math.random()*1000),title}
//             ]
// setBooks(updatedBooks);
    };

    // const deleteBookById=(id)=>{
    //     const updatedBooks=books.filter((book)=>{
    //         return book.id !== id
    //     })
    //     setBooks(updatedBooks);
    // }
    const deleteBookById= async(id)=>{
        await axios.delete(`http://localhost:3001/books/${id}`)
        const updatedBooks=books.filter((book)=>{
            return book.id !== id
        })
        setBooks(updatedBooks);
    }

    // const editBookByiD=(id,newTitle)=>{
    //     const updatedBooks=books.map((book)=>{
    //         if(book.id===id){
    //             return{...book,title:newTitle}
    //         }else{
    //             return book;
    //         }
    //     })
    //     setBooks(updatedBooks);
    // }

    const editBookByiD= async(id,newTitle)=>{
    const response=    await axios.put(`http://localhost:3001/books/${id}`,{
            title:newTitle
        });
        // const updatedBooks=books.map((book)=>{
        //     if(book.id===id){
        //         return{...book,title:newTitle}
        //     }else{
        //         return book;
        //     }
        // })
        const updatedBooks=books.map((book)=>{
            if(book.id===id){
                return{...book,...response.data}
            }else{
                return book;
            }
        })

        setBooks(updatedBooks);
    }


    return <div className="app">BOOK LIST
        <BookList books={books} onDelete={deleteBookById} onEdit={editBookByiD}></BookList>
        <BookCreate onCreate={createBook}></BookCreate>
       
    </div>;
}
export default App;