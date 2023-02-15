import { useState, useEffect } from 'react'

import styles from './ProjectForm.module.css'
import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'


function ProjectForm({handleSubmit, btnText, projectData}){

    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {})

    useEffect(() =>{
        
        fetch("http://localhost:5000/categories",{
            method:"GET",
            headers:{
                'Content-Type': 'application/json'
            },
        })
        .then(resp => resp.json())
        .then((data) => {
            setCategories(data)
        })
        .catch(err => console.error(err))

    },[])


    const submit = (e) => {
        e.preventDefault()
        handleSubmit(project)
    }

    function handleChange(e) {
        setProject({...project, [e.target.name]: e.target.value})
        console.log(project)
    }


    return (
        <form onSubmit={submit} className={styles.form}>
            <div>
               <Input 
               type='text' 
               text='Nome do Projeto:'
               name='name'
               placeholder='Insira o nome do Projeto'

               />
            </div>

            <div>
            <Input 
               type='number' 
               text='Orçamento do projeto:'
               name='budget'
               placeholder='Insira o Orçamento total'/>
            </div>

                <Select name='category_id' text='Selecione a categoria:' options={categories}/>

                <SubmitButton text={btnText}/>
        
        </form>
    )
}

export default ProjectForm