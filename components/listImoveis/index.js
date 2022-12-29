import { useState, useEffect, useContext } from 'react';
import  Link  from 'next/link';
import Image from 'next/image';
import  Head from 'next/head';
import { AuthContext } from '../../context';
import { Range } from 'react-range';
import Select from 'react-select';
import Paginate from 'react-js-pagination';

import { urlImgs, moneyFormatter, titleSite, itensPorPagina, handleUrl, descriptionDefault, urlSite,  urlFavicon, apiId, apiUrl } from '../../utils';
import { getValores, utils } from './functions'

import SmFoto from '../../public/img/sm-foto.jpg';
import Place from '../../public/img/place.svg';
import { useRouter } from 'next/router';
import CardBusca from '../cardBusca';

export default function ListImoveis(props) {    
    const router = useRouter();
    const { finalidadePagina } = props
    const {finalidades,tipoimoveis,estados,valores, setValores} = useContext(AuthContext);
    const queryInicial = router.query;
    const [ formulario, setFormulario ] = useState(queryInicial);  
    const arrayFinalidades = finalidades.map(item => {return { value: item, label:item}})     
    const [ totalImoveis, setTotalImoveis ] = useState();
    const [ listaImoveis, setImoveis ] = useState([]);
    const [ pagina, setPagina ] = useState(0);
    const [ loading, setLoading ] = useState(true);  
    const [ loadingDados, setLoadingDados ] = useState(true);    
    const [ cidades, setCidades ] = useState([]);        
    const [ bairro, setBairro ] = useState([]); 

    useEffect(()=>{
        if(finalidadePagina){
            getDados({...queryInicial, ...{ finalidade : finalidadePagina || ''}})
            mudarDadosFormulario({finalidade : finalidadePagina})
        }else{
            getDados(queryInicial)
        }
        if(queryInicial.uf) getCidade(queryInicial.uf)
        if(queryInicial.cidade) getBairro(queryInicial.cidade)
        if(!queryInicial.uf && !queryInicial.cidade) setLoadingDados(false)
    },[]);

    useEffect(() => {
        handleRequisicao()
    },[pagina])

    function mudarDadosFormulario(dados){
     setFormulario({...formulario, ...dados});
    }
 
    useEffect(() => {
        if (window.innerWidth > 770) return 
         handleRequisicao()
    }, [formulario]);

    function handleRequisicao(){
        router.push({
            pathname:"/busca",
            query: {...formulario,...{pg: pagina}},
        })

        if (formulario.uf) getCidade(formulario.uf);
        if (formulario.cidade) getBairro(formulario.cidade);       
        getDados({...formulario,...{pg: pagina}});
        handleScroll()
    }
   
    function handleScroll() {
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }

    async function getCidade(valor) {
        setLoadingDados(true)
        const metodo =  "cidades";
        const data = await utils( metodo ,valor);
        setCidades(data.cidades); 
        setLoadingDados(false)
    }

    async function getBairro(valor) {
        const metodo =  "bairros";
        const data = await utils( metodo ,valor);         
        setBairro(data.bairros); 
        setLoadingDados(false)
    }
    
    async function handleOptionChange(tipo, valor) {
        switch (tipo) {
            
            case 'finalidade':
                const response = await getValores('valores', valor);
                setValores(response.valores)
                setFormulario({ ...formulario, ...{finalidade: valor, valorde: parseInt(response.valores.valor_minimo), valorate: parseInt(response.valores.valor_maximo)} });
                break;
            case 'tipo':
                setFormulario({ ...formulario, ...{tipo: valor} });
                break;

            case 'uf':
                setFormulario({ ...formulario, uf: valor });
                setCidades([{value: '', label: 'Carregando'}]);
                getCidade(valor)
                break;

            case 'cidade':
                setFormulario({ ...formulario, cidade: valor });
                setBairro([{value: '', label: 'Carregando'}]);
                getBairro(valor)
                break;

            case 'bairro':
                setFormulario({ ...formulario, bairro: valor }); 
                break;

            case 'valorde':
                setFormulario({ ...formulario, valorde: valor });
                break;

            case 'valorate':
                setFormulario({ ...formulario, valorate: valor }); 
                break;
                
            default:
                
                break;
        }
    }

    async function handleSubmit() {
        setLoading(true);
        router.push({
            pathname: '/busca',
            query: {...formulario,...{pg: pagina}},
        })

        getDados({...formulario,...{pg: pagina}});
        
    }
    
    async function getDados({ ...search }) {
        setLoading(true);
        let auxSearch = {...search}
        if(auxSearch.finalidade) auxSearch.finalidade = auxSearch.finalidade == "Venda"? 2:1;
        const corpo = JSON.stringify( {
            acoes: [  
                
                { 
                    metodo: "busca", 
                    params: [ 
                        {                             
                            resultados: 12,
                            ...auxSearch
                        }]
                }
            ], id: apiId
        });
        
        const response =  await fetch(
            apiUrl,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: corpo
            }
        
        );
        const list = await response.json()
        setTotalImoveis(list.busca.total_registros);
        setImoveis(list.busca.total_registros ? list.busca.imoveis : []);
        setTimeout(() => {setLoading(false)}, 100);
      
    }

    let renderSkeletonList = [];
    for (let i = 0; i < itensPorPagina; i++) { renderSkeletonList[i] = i; }

    return (

        <>             
            <div className="main">
       
                {/* <ContentHeade title="Resultado da Busca" noSearch={true}  callbackchage={ (dadosFormulario) => setFormulario(dadosFormulario) } busca dadosFiltrados={formulario}/> */}
                
                <div className="container px-4 px-sm-0">

                    <CardBusca
                        loadingDados={loadingDados}
                        arrayFinalidades={arrayFinalidades}
                        tipoimoveis={tipoimoveis}
                        formulario={formulario}
                        estados={estados}
                        cidades={cidades}
                        bairro={bairro}
                        valores={valores}
                        loading={loading}
                        handleOptionChange={(tipo, value) => handleOptionChange(tipo,value)}
                        mudarDadosFormulario={(e) => mudarDadosFormulario(e)}
                        handleSubmit={() => handleSubmit()}
                    />

                    { listaImoveis.length > 0 ?  (
                        <>
                        <header className= "d-flex topo-grid justify-content-between align-items-md-center flex-column flex-md-row pt-2 pt-md-5">
                            <div className="d-none d-md-block font-14 font-md-18 qtde pr-5">
                                <b className="pr-2">{totalImoveis > 1 ? `${totalImoveis} imóveis` : `${totalImoveis} imóvel` }</b>                                                               
                            </div>
                            <div>  
                                {/* <Select className="select filtro" classNamePrefix="react-select" defaultInputValue={filtrado ? filtrado : ''} onChange={(e) => handleOrdenacao(e.value)} name="" placeholder="FILTRAR" options={filtros} />                                 */}
                            </div>
                        </header>
                        <div className="row pt-2 pb-5">
                            
                            {  listaImoveis.map(imovel => {
                                return (
                                    <div key={imovel.id} className="col-12 col-md-6 col-xl-3 py-4">
                                        <Link href={`/imovel/${imovel.id}`} className="d-flex flex-column shadow h-100 item-grid">
                                            
                                            <div className="foto position-relative">
                                                { imovel.imagem ? (
                                                    <Image src={`${urlImgs}/${imovel.imagem}`} alt={imovel.tipo} width="290" height="100"/> 
                                                
                                                ) : <Image src={SmFoto} alt={imovel.tipo}  width="290" height="100"/> }      
                                                {/* <Skeleton className="skeleton-absolute" /> */}
                                            </div>
                                            <div className="d-flex flex-grow-1 flex-column px-3 py-3">
                                                
                                                <div className="flex-grow-2">
                                                    <div className="font-12 font-md-11 line-height-100">{imovel.finalidade}{imovel.tipo && <small className="ml-1 font-italic opacity-50">({imovel.tipo})</small>}</div>
                                                    <div className="font-20 color-primary">
                                                        { imovel.valor ? (
                                                            <b>R$ {moneyFormatter(imovel.valor)}</b>
                                                        ) :
                                                        (
                                                            <b>Consulte-nos</b>
                                                        ) }
                                                        
                                                    </div>
                                                    { imovel.valor_condominio && <div className="font-12 font-md-11 line-height-100">Condomínio: R$ {moneyFormatter(imovel.valor_condominio)}</div> }
                                                </div>

                                                <div className="d-flex infos flex-grow-1 align-items-center py-3">
                                                    <div className="d-flex">
                                                        { imovel.dormitorios != 0 && <div className="info info-dormitorios font-12 font-md-11 line-height-100 pr-3"><div>{imovel.dormitorios}</div></div> }
                                                        { imovel.banheiros != 0 && <div className="info info-banheiros font-12 font-md-11 line-height-100 pr-3"><div>{imovel.banheiros}</div></div> }
                                                        { imovel.area != 0 && <div className="info info-area font-12 font-md-11 line-height-100 pr-3"><div>{imovel.area} m<sup>2</sup></div></div> }
                                                    </div>
                                                </div>
                                                
                                                <div className="endereco font-12 line-height-130">
                                                    <Image src={Place} alt="" width="290" height="100"/>
                                                    {`${imovel.bairro} | ${imovel.cidade}/${imovel.uf}`}
                                                </div>
                                                
                                            </div>
                                            
                                        </Link>
                                    </div>
                                );

                            })  }

                        </div>

                        { totalImoveis > itensPorPagina && (
                            <div className="d-flex justify-content-center pt-2 pb-5 pagination-container">
                                <Paginate                                     
                                    hideFirstLastPages={true}
                                    activePage={pagina ? pagina : 1}
                                    itemsCountPerPage={itensPorPagina}
                                    totalItemsCount={totalImoveis}
                                    pageRangeDisplayed={5}
                                    onChange={e => setPagina(e)}
                                /> 
                            </div> 
                        ) }

                        </>                     
                    ) :(
                        loading ?
                           <div className="text-center py-5 my-5 font-32 opacity-50 "></div>
                       : 
                            <div className="text-center py-5 my-5 font-32 opacity-50">Nenhum imóvel encontrado</div> 
                                     
                   )}                                        

                </div>

            </div>

        </>

    )

    
}