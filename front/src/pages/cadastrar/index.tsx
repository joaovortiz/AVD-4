import React, { useState, useEffect, ChangeEvent,useCallback, ButtonHTMLAttributes } from "react";
import { FiArrowLeft } from 'react-icons/fi';
import Logo from '../../assets/logo.png';
import Button from "../../components/Button";
import Input from '../../components/Input'
import { Container } from './styles';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { Doutor, Paciente, Exame } from "../../services/interfaces";
import api from '../../services/api';


const Cadastrar: React.FC = () => {

  const history = useHistory();
  const [selectedDoutor, setSelectedDoutor] = useState('');
  const [selectedPaciente, setSelectedPatient] = useState('');
  const [doutor, setDoutor] = useState<Doutor[]>([]);
  const [paciente, setPaciente] = useState<Paciente[]>([]);

  const load = async () => {
    await api
      .get('doutores')
      .then(({ data }) => {
        setDoutor(data.docs)
      })
    await api
      .get('pacientes')
      .then(({ data }) => {
        setPaciente(data.docs)
      })
  }
  useEffect(() => {
    load()}, [])

  function handleSelectDoutor(event: ChangeEvent<HTMLSelectElement>) {
    const res = event.target.value;

    setSelectedDoutor(res);
  };

  function handleSelectPaciente(event: ChangeEvent<HTMLSelectElement>) {
    const res = event.target.value;

    setSelectedPatient(res);
  };

  async function handleSubmit(data: Exame) {
      try {
        const schema = Yup.object().shape({
          data: Yup.string().required('Data do exame obrigatório'),
          hora: Yup.string().required('Hora do exame obrigatório'),
        });

        await schema.validate(data, {
            abortEarly: false
        });

        if (!selectedDoutor || !selectedPaciente) {
          throw new Error("Médico e Paciente são obrigatórios");
        }

        let body = {
          doutor_id: selectedDoutor,
          paciente_id: selectedPaciente,
          data: data.data,
          hora: data.hora
        }
        
        try {
            await api({
                method: 'post',
                url: 'exames',
                data: body,
                headers: {'Content-Type': 'application/json' }
                })

            alert('Cadastro efetuado com sucesso.')

            history.push('/')
        } catch (err) {
            alert('Erro ao cadastrar seus dados.')
        }
    } catch ( error ) {
        console.log(error)
    }
  }

    return(
        <Container>
            <header>
                <img src={Logo} alt="medico" />

                <span>Cadastro de Exames</span>

                <a href="/">
                <FiArrowLeft />
                    Voltar
                </a>
            </header>

        <Form onSubmit={handleSubmit}>



        <select
            value={selectedDoutor}
            onChange={handleSelectDoutor}
          >
            <option>Selecione o Medico</option>
          {
            doutor.length > 0
            ? doutor.map((o) => {
                return (
                  <option key={o._id} value={o._id}>{o.nome} - {o.especialidade}</option>
                )
              })
            : <option>Nenhum Medico encontrado</option>
          }
          </select>
           
           <select
              value={selectedPaciente}
              onChange={handleSelectPaciente}
            >
            <option>Selecione o Paciente</option>
            
          {
            paciente.length > 0
            ? paciente.map((o) => {
                return (
                  <option key={o._id} value={o._id}>{o.nome}</option>
                )
              })
            : <option>Nenhum Paciente encontrado</option>
          }
          
          </select>
          <br></br>
          <Input name="data" type="date" placeholder="Data do Exame" />
          <Input name="hora" type="time" placeholder="Hora do Exame" />



          <Button type="submit">
            Cadastrar Exame
          </Button>
        </Form>
      </Container>
            
    );
}

export default Cadastrar;