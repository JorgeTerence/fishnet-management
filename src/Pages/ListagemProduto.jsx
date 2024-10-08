import {
  ArrowTopRightOnSquareIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  FunnelIcon,
  LockClosedIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  PlusIcon,
  PrinterIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useContext, useEffect, useState } from "react";
import { TitleContext } from "../App";
import ListingFilter from "../components/ListingFilter";
import { Link } from "react-router-dom";
import { listAllProducts } from "../lib/query";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

function AddProduct({ open, setOpen }) {
  const [images, setImages] = useState([""]);

  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
      <div className="fixed inset-0 flex w-screen items-center justify-center bg-zinc-800/50 p-4">
        <DialogPanel className="h-[calc(100vh-4rem)] w-full mx-44 space-y-4 rounded-lg border border-slate-500 shadow-lg bg-slate-300 p-12 text-slate-800">
          <header>
            <DialogTitle className="font-bold">Cadastrar produto</DialogTitle>
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2"
            >
              <XMarkIcon className="size-5" />
            </button>
          </header>
          
          <form action="" method="post" className="flex flex-col gap-4 text-stone-900 overflow-y-scroll max-h-[67vh] lg:max-h-[60vh]">
            <div className="flex flex-col gap-1 max-w-4xl">
              <label htmlFor="txt-name">
                Nome do Peixe
              </label>
              <input
                type="text"
                name="name"
                id="txt-name"
                className="bg-stone-200 border py-1 px-2 border-stone-500 outline-none rounded focus:border-sky-600 transition-colors duration-200 focus:shadow shadow-sky-600 focus:ring-1 ring-sky-600"
                placeholder="Digite o nome do peixe a ser cadastrado"
              />
            </div>
            <div className="flex flex-col gap-2 max-w-4xl">
              <label htmlFor="txt-namec">Família do Peixe</label>
              <input 
                type="text" 
                name="familyname" 
                id="txt-familyname" 
                className="bg-stone-200 border py-1 px-2 border-stone-500 outline-none rounded focus:border-sky-600 transition-colors duration-200 focus:shadow shadow-sky-600 focus:ring-1 ring-sky-600" 
                placeholder="Digite o nome da família do peixe a ser cadastrado"
              />
            </div>
            <div className="flex flex-col gap-2 max-w-4xl">
              <label htmlFor="txt-namec">Origem</label>
              <input 
                type="text" 
                name="origemname" 
                id="txt-origemname" 
                className="bg-stone-200 border py-1 px-2 border-stone-500 outline-none rounded focus:border-sky-600 transition-colors duration-200 focus:shadow shadow-sky-600 focus:ring-1 ring-sky-600" 
                placeholder="Digite o nome da origem do peixe a ser cadastrado"  
              />
            </div>  
            <div className="flex flex-col gap-2 max-w-4xl">
              <label htmlFor="txt-price">pH</label>
              <input 
                type="number" 
                name="ph" 
                id="txt-ph" 
                className="bg-stone-200 border py-1 px-2 border-stone-500 outline-none rounded focus:border-sky-600 transition-colors duration-200 focus:shadow shadow-sky-600 focus:ring-1 ring-sky-600" 
                placeholder="Digite o pH do peixe a ser cadastrado"
              />
            </div>
            <div className="flex flex-col gap-2 max-w-4xl">
              <label htmlFor="txt-namec">Expectativa de Vida</label>
              <input 
                type="text" 
                name="expname" 
                id="txt-expname" 
                className="bg-stone-200 border py-1 px-2 border-stone-500 outline-none rounded focus:border-sky-600 transition-colors duration-200 focus:shadow shadow-sky-600 focus:ring-1 ring-sky-600" 
                placeholder="Digite a expectativa de vida do peixe a ser cadastrado"
              />
            </div>
            <div className="flex flex-col gap-2 max-w-4xl">
              <label htmlFor="txt-namec">Tamanho Adulto</label>
              <input 
                type="text" 
                name="tmadulto" 
                id="txt-tmadulto" 
                className="bg-stone-200 border py-1 px-2 border-stone-500 outline-none rounded focus:border-sky-600 transition-colors duration-200 focus:shadow shadow-sky-600 focus:ring-1 ring-sky-600" 
                placeholder="Digite o tamanho adulto do peixe a ser cadastrado"
            />
            </div>
            <div className="flex flex-col gap-2 max-w-4xl">
              <label htmlFor="txt-namec">Temperatura</label>
              <input 
                type="text" 
                name="temper" 
                id="txt-temper" 
                className="bg-stone-200 border py-1 px-2 border-stone-500 outline-none rounded focus:border-sky-600 transition-colors duration-200 focus:shadow shadow-sky-600 focus:ring-1 ring-sky-600" 
                placeholder="Digite a temperatura do peixe a ser cadastrado"  
              />
            </div>
            <div className="flex flex-col gap-2 max-w-4xl">
              <label htmlFor="txt-namec">Descrição de Especificação</label>
              <input 
                type="text" 
                name="desc" 
                id="txt-desc" 
                className="bg-stone-200 border py-1 px-2 border-stone-500 outline-none rounded focus:border-sky-600 transition-colors duration-200 focus:shadow shadow-sky-600 focus:ring-1 ring-sky-600" 
                placeholder="Digite a descrição do peixe a ser cadastrado"
              />
            </div>

            <div className="flex flex-col gap-2 max-w-4xl">
              <label>Imagens</label>
              {images.map((image, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="url"
                    name="image"
                    id={`txt-img-${i}`}
                    placeholder="URL da imagem"
                    className="bg-stone-200 border py-1 px-2 border-stone-500 outline-none rounded focus:border-sky-600 transition-colors duration-200 focus:shadow shadow-sky-600 focus:ring-1 ring-sky-600 w-full"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newImages = images.slice();
                      newImages.splice(i, 1); // Remove a imagem da lista
                      setImages(newImages);
                    }}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    Remover
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => setImages([...images, ""])} className="mt-2 flex items-center gap-1 text-blue-dark hover:text-sky-800 transition-colors">
                <PlusIcon className="size-4" />
                Adicionar Imagem
              </button>
            </div>
            
          </form>
          <div className="flex flex-row justify-end p-4 gap-4 mt-5">
              <button className="action">Cadastrar</button>
              <button className="alternate">Limpar</button>
            </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

function ListagemProduto() {
  const setTitle = useContext(TitleContext);
  setTitle("Produtos");

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [registerOpen, setRegisterOpen] = useState(false);

  useEffect(() => {
    listAllProducts().then((data) => {
      setProducts(data);
      setFilteredProducts(data); 
    });
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(value)
    );
    setFilteredProducts(filtered);
  };

  return (
    <>
      <AddProduct open={registerOpen} setOpen={setRegisterOpen} />
      <ListingFilter>
        <span className="flex items-center text-slate-600 flex-1 gap-1">
          <MagnifyingGlassIcon className="size-4" />
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Pesquise"
            maxLength={100}
            value={searchTerm}
            onChange={handleSearch}
            className="w-full placeholder:text-slate-500 focus:outline-none"
          />
        </span>

        <button className="flex items-center gap-1 relative group cursor-pointer">
          <CurrencyDollarIcon className="size-4" />
          <span>Preço</span>
          <ChevronDownIcon className="size-4 ml-4" />

          <div className="panel left-0 top-10">
            <input
              type="range"
              name="price"
              id="price"
              className="accent-highlighy-dimm"
            />
            <div className="flex justify-between text-sm">
              <span>R$10,00</span>
              <span>R$500,00</span>
            </div>
          </div>
        </button>

        <button className="flex items-center gap-1 relative group cursor-pointer">
          <FunnelIcon className="size-4" />
          <span className="text-nowrap">Outros filtros</span>
          <ChevronDownIcon className="size-4 ml-4" />

          <div className="panel right-0 top-10 px-10 text-left">
            <ul className="flex flex-col gap-1">
              <li className="hover:text-slate-800">Água doce</li>
              <li className="hover:text-slate-800">Água salgada</li>
              <li className="hover:text-slate-800">Em oferta</li>
              <li className="hover:text-slate-800">Em estoque</li>
            </ul>
          </div>
        </button>
      </ListingFilter>

      <header className="flex justify-end gap-3 my-4">
        <button className="action" onClick={() => setRegisterOpen(true)}>
          <PlusCircleIcon className="size-5" />
          Adicionar
        </button>
        <button className="action">
          <PrinterIcon className="size-5" />
          Imprimir
        </button>
      </header>

      <div className="md:overflow-x-hidden overflow-x-scroll">
        <article className="grid-cols-[90px_minmax(130px,1fr)_90px_90px_minmax(130px,1fr)_90px_70px]">
          <header className="listing col-span-7">
            <span>
              <span className="bg-slate-200 rounded-lg px-2">#</span>
            </span>
            <span>Nome</span>
            <span>Preço</span>
            <span>Estoque</span>
            <span>Foto</span>
            <span>Insights</span>
            <span>Ações</span>
          </header>

          {filteredProducts.map((product) => (
            <section className="grid grid-cols-subgrid col-span-7 pl-[9px] my-3 *:ml-2" key={product.id}>
              <span className="w-8">
                <span className="bg-slate-200 rounded-lg px-2 text-slate-500 text-sm truncate w-8 max-w-8">
                  {product.id.slice(0, 6)}...
                </span>
              </span>
              <span className="text-nowrap truncate">{product.name}</span>
              <span>R${product.price}</span>
              <span>{product.name.length}</span>
              <span className="truncate text-nowrap underline hover:text-yellow-light">

                <Link to={product.pictures[0]}>{product.pictures[0]}</Link>
              </span>
              <ArrowTopRightOnSquareIcon className="size-5 text-slate-800 hover:text-yellow-light cursor-pointer transition-colors duration-200" />
              <span className="flex gap-2">
                <button>
                  <LockClosedIcon className="size-5" />
                </button>
                <button>
                  <PencilSquareIcon className="size-5" />
                </button>
              </span>
            </section>
          ))}
        </article>
      </div>
    </>
  );
}

export default ListagemProduto;
