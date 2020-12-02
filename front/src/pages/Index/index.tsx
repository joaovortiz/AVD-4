import React, { useState, useEffect  } from "react";
import Logo from '../../assets/logo.png';
import { Container } from './styles';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';
import { Exame } from "../../services/interfaces";





const Profile: React.FC = () => {
    const history = useHistory();
    const [data, setData] = useState<Exame[]>([]);

    const load = async () => {
        await api
          .get('exames')
          .then(({ data }) => {
            setData(data.docs)
            console.log(data)
            
          })
    }
    useEffect(() => {
      load()}, [])

      const handleEdit = async (codigo: String) => {
        history.push('/editar/' + codigo)
      }
  
      const handleDelete = async (codigo: String) => {
          try {
              await api.delete(`exames/${codigo}`)
  
              alert('Cadastro deletado com sucesso.')
              load()
  
          } catch (err) {
              alert('Erro ao deletar registro.')
          }
      }


    return(
        <Container>
            <header>
                <img src={Logo} alt="medico" />
                <a href="/cadastrar">Cadastrar Exame</a>
            </header>

        

<h1>Consultas cadastradas</h1>
            <div>
            {
                data.length > 0
                ? data.map((p) => {
                    return (
                    <ul key={p._id}>
                       
                           
                            
                            

                           
                                <li>

                                       <strong>Data da Consulta {p.data}</strong>

                                    <strong>Horario da Consulta:{p.hora} </strong>
                                
                                    
                                
                                    <strong>Nome do Paciente: {p.paciente.nome} </strong>
                                
                                  
                                
                                    <strong>Nome do Médico: {p.doutor.nome} </strong>
                                
                                  
                                
                                    <strong>Especialidade: {p.doutor.especialidade}</strong>

                                   
                                </li>
                                
                              
                            
                                <button className="actionEditBtn" onClick={() => { handleEdit(p._id) }}>Editar</button>
                          <br></br>
                              <button className="actionDelBtn" onClick={() => { handleDelete(p._id) }}>
                                  Cancelar Exame
                              </button>
                          
                          </ul>   

                            
                            
                           
                      
                    )
                })
                : <ul>
                    <li>
                        <span>Nenhum registro encontrado</span>
                    </li>
                </ul>
            }
        </div>
        </Container>















            
    );
}

export default Profile;