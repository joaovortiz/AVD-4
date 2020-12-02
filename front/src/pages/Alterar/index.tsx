import React, { useState, useEffect, ChangeEvent} from "react";
import { FiArrowLeft } from 'react-icons/fi';
import Logo from '../../assets/logo.png';
import Button from "../../components/Button";
import Input from '../../components/Input'
import { Container } from './styles';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Doutor, Paciente, Exame } from "../../services/interfaces";
import api from '../../services/api';


interface CardParams {
  id: string;
}

const Editar: React.FC = () => {
 
  const history = useHistory();
  const [exame, setAppointment] = useState<Exame>();
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedPatient, setSelectedPatient] = useState('');
  const [doutor, setDoctor] = useState<Doutor[]>([]);
  const [paciente, setPatient] = useState<Paciente[]>([]);
  const { params } = useRouteMatch<CardParams>();
  

  function handleSelectDoctor(event: ChangeEvent<HTMLSelectElement>) {
    const res = event.target.value;

    setSelectedDoctor(res);
  };

  function handleSelectPatient(event: ChangeEvent<HTMLSelectElement>) {
    const res = event.target.value;

    setSelectedPatient(res);
  };

  const load = async () => {
    await api
      .get('doutores')
      .then(({ data }) => {
        setDoctor(data.docs)
      })
    await api
      .get('pacientes')
      .then(({ data }) => {
        setPatient(data.docs)
      })
    await api
      .get('exames/' + params.id)
      .then(({ data }) => {
        setAppointment(data)
        setSelectedDoctor(data.ductor_id)
        setSelectedPatient(data.paciente_id)
      })
      
  }
  useEffect(() => {
    load()}, [params.id])

    async function handleSubmit(data: Exame) {
      try {
        const schema = Yup.object().shape({
          data: Yup.string().required('Data do exame obrigatório'),
          hora: Yup.string().required('Hora do exame obrigatório'),
        });

        await schema.validate(data, {
            abortEarly: false
        });

        let body = {
          doutor_id: selectedDoctor,
          paciente_id: selectedPatient,
          data: data.data,
          hora: data.hora
        }
        
        try {
            await api({
                method: 'put',
                url: 'exames/' + params.id,
                data: body,
                headers: {'Content-Type': 'application/json' }
                })

            alert('Edição efetuado com sucesso.')

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

                <span>Alterar Exames</span>

                <a href="/">
                <FiArrowLeft />
                    Voltar
                </a>
            </header>

        <Form onSubmit={handleSubmit}>



        <select
            value={selectedDoctor}
            onChange={handleSelectDoctor}
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
              value={selectedPatient}
              onChange={handleSelectPatient}
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

          <Input name="date" type="date" placeholder="Data do Exame" />
          <Input name="time" type="time" placeholder="Hora do Exame" />



        <Button type="submit">
          Alterar Informações
        </Button>
      </Form>
        </Container>
            
    );
}

export default Editar;