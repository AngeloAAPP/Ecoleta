import React, {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {FiArrowLeft, FiCheckCircle} from 'react-icons/fi'
import axios from 'axios'
import api from '../../api/config'
import {Map, Marker, TileLayer} from 'react-leaflet'
import Dropzone from '../../components/dropzone'
import './styles.css'


import Logo from '../../components/Logo'

const CreatePoint = () => {

    const [items, setItems] = useState([]) //Itens de coleta disponiveis
    const [ufs, setufs] = useState([]) //UF's disponiveis
    const [cities, setCities] = useState([]) //Cidades disponiveis

    const [selectedItems, setSelectedItems] = useState([]) //Itens de coleta selecionados no form
    const [selectedUF, setSelectedUF] = useState("0") //UF atualmente selecionada no form
    const [selectedCity, setSelectedCity] = useState("0") //Cidade atualmente selecionada no form
    const [selectedAdress, setSelectedAdress] = useState(['0', '0']) //Endereço atualmente selecionado no mapa(lat, lng)
    const [selectedFile, setSelectedFile] = useState() //Imagem selecionada no form

    const history = useHistory()

    //Preenche os itens de coleta, as UF's e a posição inicial no mapa
    useEffect(() => {
        api.get('itens')
            .then(response => setItems(response.data))

        axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .then(response => setufs(response.data))

        navigator.geolocation.getCurrentPosition(position => {
            setSelectedAdress([position.coords.latitude, position.coords.longitude])
        })
    }, [])

    //Preenche as cidades
    useEffect(() => {

        //Reseta a cidade selecionada
        setSelectedCity("0")

        const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios`

        axios.get(url)
            .then(response => setCities(response.data))

        const comboboxUF = document.getElementById('uf')
        const comboboxCity = document.getElementById('city')

        if(comboboxUF.value !== "0")
            comboboxCity.disabled = false
        else
            comboboxCity.disabled = true
    }, [selectedUF])

    //Controla os itens selecionados no formulário
    const handleItens = id =>{
        //Verifica se o item ja está selecionado
        const isSelected = selectedItems.findIndex(item => item === id)
        
        if(isSelected === -1) 
            setSelectedItems([
                ...selectedItems, id
            ])
        else
        {
            const filteredItens = selectedItems.filter(item => item !== id)
            setSelectedItems(filteredItens)
        }
    }

    //Efetua o cadastro do ponto de coleta
    const create = async event => {
        event.preventDefault()

        const nome = document.getElementById("name").value
        const email = document.getElementById("email").value
        const whatsapp = document.getElementById("whatsapp").value

        const data = new FormData();
        data.append("nome", nome)
        data.append("email", email)
        data.append("whatsapp", whatsapp)
        data.append("latitude", selectedAdress[0])
        data.append("longitude", selectedAdress[1])
        data.append("cidade", selectedCity)
        data.append("uf", selectedUF)
        data.append("itens", selectedItems.join(','))
        data.append("imagem", selectedFile)

        const response = await api.post("points", data)
        if(response.data.sucess)
        {
            document.getElementById('modal').classList.remove('hidden')
            setTimeout(() =>{
                history.push('/')
            }, 2000);
        }
    }

    return (
        <div id="page-create-point">
            <header>
                <Logo/>
                <Link to = "/">
                    <FiArrowLeft/>
                    Voltar para home
                </Link>
            </header>
            <form onSubmit = {create}>
                <h1>Cadastro do <br/> ponto de coleta</h1>
                <Dropzone setImage = {setSelectedFile}/>
                <fieldset>
                   
                    <legend>
                        <h2>Dados da entidade</h2>
                    </legend>
                   
                    <div className="field">
                        <label htmlFor="name">Nome</label>
                        <input type="text" name = "name" id = "name" />
                    </div>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input type="email" name = "email" id = "email" />
                        </div>

                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input type="text" whatsapp = "whatsapp" id = "whatsapp" />
                        </div>   
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>

                    <span>Permita o acesso a localização para selecionar o endereço no mapa</span>
                    <Map center = {selectedAdress} zoom = {15} onClick = {(event) => setSelectedAdress([event.latlng.lat, event.latlng.lng])}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                        />
                        <Marker position = {selectedAdress}/>
                    </Map>

                    <div className="field-group">
                        <div className="field">
                            <select name="uf" id="uf" onChange = {(event) => setSelectedUF(event.target.value)}>
                                <option value="0">Selecione o estado</option>
                                {ufs.map(uf => (
                                    <option key = {uf.id} value={uf.sigla}>{uf.sigla}</option>
                                ))}
                             </select>
                        </div>
                        <div className="field">
                            <select name="city" id="city" disabled onChange = {(event) => setSelectedCity(event.target.value)}>
                                <option value="0">Selecione a cidade</option>
                                {cities.map(city => (
                                    <option key = {city.id} value={city.nome}>{city.nome}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Itens de coleta</h2>
                        <span>Selecione um ou mais itens abaixo</span>
                    </legend>
                    <ul className="items-grid">
                        {
                            items.map(item => 
                                (
                                    <li 
                                        className = {selectedItems.includes(item.id) ? "selected" : ""} 
                                        key = {item.id} 
                                        onClick = {() => handleItens(item.id)}
                                    >
                                        <img src={item.url_imagem} alt={item.titulo}/>
                                        <span>{item.titulo}</span>
                                    </li>
                                )
                            )
                        }
                    </ul>
                </fieldset>
                <button>Cadastrar ponto</button>
            </form>
            <div id = "modal" className="modal hidden">
                <div className="content">
                    <FiCheckCircle/>
                    <h1>Cadastro concluído</h1>
                </div>
            </div>

        </div>
    )
}

export default CreatePoint
