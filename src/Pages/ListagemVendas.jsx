import {
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  PrinterIcon,
  PlusCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Tippy from "@tippyjs/react";
import React, { useContext, useEffect, useState } from "react";
import { TitleContext } from "../App";
import ListingFilter from "../components/ListingFilter";
import { price } from "../lib/format";
import { API_URL } from "../lib/query";
import loadingImage from "../LoadingImage.gif"
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

function FilterProduct({ open, setOpen, onSaveFilters }) {
  const [selectedEnvironment, setSelectedEnvironment] = useState(null);
  const [selectedDiet, setSelectedDiet] = useState(null);
  const [selectedBehavior, setSelectedBehavior] = useState(null);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const clearFilters = () => {
    setSelectedEnvironment(null);
    setSelectedDiet(null);
    setSelectedBehavior(null);
    setMinPrice('');
    setMaxPrice('');
  };

  const [filters, setFilters] = useState({
    feeding: '',
    tankSize: '',
    // Add other filters as needed
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const selectedFilters = {
      ...filters,
      tags: selectedEnvironment,
      feeding: selectedDiet,
      behavior: selectedBehavior,
      minPrice: minPrice ? Number(minPrice) : undefined, // Convert to number or undefined if empty
      maxPrice: maxPrice ? Number(maxPrice) : undefined, // Convert to number or undefined if empty
    };
    onSaveFilters(selectedFilters); // Sends the filters to `ListagemProduto`
    setOpen(false); // Closes the modal
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
      <div className="fixed inset-0 flex items-center justify-center md:justify-end bg-[#11223a]/80 p-4">
        <DialogPanel className="h-full w-full sm:max-w-md md:w-[45%] lg:w-[25%] mx-0 space-y-6 rounded-lg border border-[#cbd5e1] shadow-xl bg-[#f7f9fb] p-6 md:p-8 text-[#11223a] overflow-y-auto">
          <header className="relative flex justify-between items-center mb-6">
            <DialogTitle className="font-bold text-lg sm:text-xl md:text-2xl">Filtros</DialogTitle>
            <button onClick={() => setOpen(false)} className="text-[#11223a] hover:text-[#c7ae5d]">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </header>

          {/* Seção de Filtros */}
          <section className="space-y-6">

            {/* Filtro de Valores */}
            <div>
              <h3 className="font-semibold text-md sm:text-lg text-[#c7ae5d]">Valores</h3>
              <label htmlFor="min-price" className="block mb-1 text-[#11223a]">Preço mínimo: R$</label>
              <input
                type="number"
                id="min-price"
                min={0}
                step={10}
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full rounded-md border p-2 border-[#cbd5e1] focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#f7f9fb] text-[#11223a]"
              />
              <label htmlFor="max-price" className="block mb-1 mt-4 text-[#11223a]">Preço máximo: R$</label>
              <input
                type="number"
                id="max-price"
                min={0}
                step={10}
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full rounded-md border p-2 border-[#cbd5e1] focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#f7f9fb] text-[#11223a]"
              />
            </div>

            {/* Filtro de Pagamento */}
            <div>
              <h3 className="font-semibold text-md sm:text-lg text-[#c7ae5d]">Pagamento</h3>
              <div className="flex flex-col gap-2">
                <button
                  className={`w-full p-2 border rounded-md ${selectedBehavior === 'peaceful' ? 'bg-blue-100 border-blue-500' : 'border-[#cbd5e1] hover:bg-[#cbd5e1]'} text-[#11223a]`}
                  onClick={() => setSelectedBehavior(selectedBehavior === 'peaceful' ? null : 'peaceful')}
                >
                  🕊️ Pix
                </button>
                <button
                  className={`w-full p-2 border rounded-md ${selectedBehavior === 'aggressive' ? 'bg-blue-100 border-blue-500' : 'border-[#cbd5e1] hover:bg-[#cbd5e1]'} text-[#11223a]`}
                  onClick={() => setSelectedBehavior(selectedBehavior === 'aggressive' ? null : 'aggressive')}
                >
                  🦈 Mastercard
                </button>
                <button
                  className={`w-full p-2 border rounded-md ${selectedBehavior === 'schooling' ? 'bg-blue-100 border-blue-500' : 'border-[#cbd5e1] hover:bg-[#cbd5e1]'} text-[#11223a]`}
                  onClick={() => setSelectedBehavior(selectedBehavior === 'schooling' ? null : 'schooling')}
                >
                  🐟 Visa
                </button>
              </div>
            </div>

            {/* Filtro de Comportamento Social */}
            <div>
              <h3 className="font-semibold text-md sm:text-lg text-[#c7ae5d]">Status</h3>
              <div className="flex flex-col gap-2">
                <button
                  className={`w-full p-2 border rounded-md ${selectedBehavior === 'peaceful' ? 'bg-blue-100 border-blue-500' : 'border-[#cbd5e1] hover:bg-[#cbd5e1]'} text-[#11223a]`}
                  onClick={() => setSelectedBehavior(selectedBehavior === 'peaceful' ? null : 'peaceful')}
                >
                  🕊️ Finalizado
                </button>
                <button
                  className={`w-full p-2 border rounded-md ${selectedBehavior === 'aggressive' ? 'bg-blue-100 border-blue-500' : 'border-[#cbd5e1] hover:bg-[#cbd5e1]'} text-[#11223a]`}
                  onClick={() => setSelectedBehavior(selectedBehavior === 'aggressive' ? null : 'aggressive')}
                >
                  🦈 Pendente
                </button>
                <button
                  className={`w-full p-2 border rounded-md ${selectedBehavior === 'schooling' ? 'bg-blue-100 border-blue-500' : 'border-[#cbd5e1] hover:bg-[#cbd5e1]'} text-[#11223a]`}
                  onClick={() => setSelectedBehavior(selectedBehavior === 'schooling' ? null : 'schooling')}
                >
                  🐟 Cancelado
                </button>
              </div>
            </div>

            {/* Filtro de datas */}
            <div>
              <h3 className="font-semibold text-md sm:text-lg text-[#c7ae5d]">Datas</h3>
              <label htmlFor="min-price" className="block mb-1 text-[#11223a]">Data inicial</label>
              <input
                type="data"
                id="min-data"
                min={0}
                step={10}
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full rounded-md border p-2 border-[#cbd5e1] focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#f7f9fb] text-[#11223a]"
              />
              <label htmlFor="max-price" className="block mb-1 mt-4 text-[#11223a]">Data final</label>
              <input
                type="data"
                id="max-data"
                min={0}
                step={10}
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full rounded-md border p-2 border-[#cbd5e1] focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#f7f9fb] text-[#11223a]"
              />
            </div>


            {/* Botões de Ação */}
            <div className="flex gap-4 mt-6">
              <button className="flex-1 rounded bg-[#c7ae5d] px-4 py-2 text-white hover:bg-[#11223a]" onClick={handleSave}>
                Salvar
              </button>
              <button className="flex-1 rounded px-4 py-2 border border-red-600 hover:bg-red-600 text-red-600 hover:text-white" onClick={clearFilters}>
                Limpar
              </button>
            </div>
          </section>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

const ListagemVendas = () => {
  const setTitle = useContext(TitleContext);
  useEffect(() => {
    console.log("Executando setTitle");
    setTitle((prevTitle) => {
      if (prevTitle !== "Vendas") {
        return "Vendas";
      }
      return prevTitle;
    });
  }, [setTitle]);

  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState(null);
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("");
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [dataOrder, setDataOrder] = useState("none");
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [filteringOpen, setFilteringOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("none");
  const [priceOrder, setPriceOrder] = useState("none");


  // Função para buscar os dados da API
  useEffect(() => {
    const fetchSalesData = async () => {
      // Condiciona o ordering para ser adicionado apenas quando for +date ou -date
      const ordering = (dataOrder === "asc") ? "-date" : (dataOrder === "desc" ? "+date" : "");
  
      try {
        // Só inclui o parâmetro ordering na URL se ele tiver valor
        const url = ordering ? `${API_URL}/sales/filter?ordering=${ordering}` : `${API_URL}/sales/filter`;
  
        const response = await fetch(url);
        console.log(response);
  
        if (!response.ok) {
          throw new Error("Erro ao carregar os dados de vendas");
        }
  
        const data = await response.json();
        setSales(data);
        setFilteredSales(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
  
    fetchSalesData();
  }, [dataOrder]);

  const statusMessages = ["Pendente", "Finalizado", "Cancelado"];

  const getReportUrl = (saleId) => {
    return `${API_URL}/reports/${saleId}`; 
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSaveFilters = (selectedFilters) => {
    setFilters(selectedFilters);
    setCurrentPage(1);
  };

  const handleSortByName = () => {
    setPriceOrder("none");
    setCurrentPage(1);
    const newOrder = sortOrder === "none" ? "asc" : sortOrder === "asc" ? "desc" : "none";
    setSortOrder(newOrder);
  };

  const handleSortByPrice = () => {
    setSortOrder("none");
    setCurrentPage(1);
    const newPriceOrder = priceOrder === "none" ? "asc" : priceOrder === "asc" ? "desc" : "none";
    setPriceOrder(newPriceOrder);
  };

  const handleSortByData = () => {
    const newDataOrder = dataOrder === "none" ? "asc" : dataOrder === "asc" ? "desc" : "none";
    setDataOrder(newDataOrder);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  
  if (loading) {
    return  <div>
    <img
      src={loadingImage}
      width={40}
      height={40}
      className="mt-5"
      alt="Carregando..."
    />
  </div>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <ListingFilter onFilterChange={handleFilterChange}>
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          {/* Barra de pesquisa */}
          <span className="flex items-center text-slate-600 flex-1 gap-1 border p-2 rounded-lg relative mb-2 md:mb-0">
            <MagnifyingGlassIcon className="size-6" />
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Produto ou ID"
              maxLength={100}
              value={searchTerm}
              //onChange={handleSearch}
              className="w-full placeholder:text-slate-500 focus:outline-none"
            />
          </span>

          {/* Botões */}
          <div className="flex gap-2">
            <button className="flex items-center gap-2 relative group cursor-pointer" 
            onClick={() => setFilteringOpen(true)}
            >
              <FunnelIcon className="size-6" />
              <span className="hidden md:inline">Filtros</span>
            </button>

            <button className="action">
              <PrinterIcon className="size-5" />
              <span className="hidden md:inline">Imprimir</span>
            </button>
          </div>
        </div>
      </ListingFilter>

      <div className="md:overflow-x-hidden overflow-x-scroll">
        <article className="grid">
          <header className="listing col-span-7 flex items-center bg-slate-100 p-2 rounded-lg shadow-md">
            <span className="font-semibold flex items-center justify-center cursor-pointer" onClick={handleSortByName}>
              Cliente  {sortOrder === "asc" ? "↓" : sortOrder === "desc" ? "↑" : "↕"}
            </span>
            <span className="font-semibold flex items-center justify-center cursor-pointer" onClick={handleSortByPrice}>
              Frete {priceOrder === "asc" ? "↓" : priceOrder === "desc" ? "↑" : "↕"}
            </span>
            <span className="font-semibold flex items-center justify-center cursor-pointer" onClick={handleSortByPrice}>
              Total {priceOrder === "asc" ? "↓" : priceOrder === "desc" ? "↑" : "↕"}
            </span>
            <span className="font-semibold flex items-center justify-center cursor-pointer">
              Pagamento 
            </span>
            <span className="font-semibold flex items-center justify-center cursor-pointer">
              Status
            </span>
            <span className="font-semibold flex items-center justify-center cursor-pointer" onClick={handleSortByData}>
              Data {dataOrder === "desc" ? "↓" : dataOrder === "asc" ? "↑" : "↕"}
            </span>
            <span className="font-semibold flex items-center justify-center cursor-pointer">
              Ações
            </span>
          </header>
          {filteredSales.map((sale) => (
            <section
              className="grid grid-cols-subgrid col-span-7 p-2 my-2 rounded-lg hover:bg-slate-50 transition-colors duration-200 items-center"
              key={sale._id}
            >
              {/* Ajuste de espaçamento entre colunas */}
              <span className="text-nowrap font-semibold truncate flex flex-col items-center">
                <span>{sale.customer.name}</span>
                <span className="text-sm text-gray-500">{sale._id}</span>
              </span>
              <span className="text-nowrap font-semibold truncate flex flex-col items-center">
                {price(sale.shipping ?? Math.random() * 40)}
                <span className="text-sm text-gray-500">{sale.shippingProvider ?? "Correios"}</span>
              </span>
              <span className="font-semibold flex items-center justify-center" >{price(sale.total)}</span>
              <span>
                <div className="flex items-center justify-center">
                  <span className="inline-block bg-slate-200 rounded-lg text-stone-600 font-semibold px-2 py-1">
                    {sale.payment_provider ?? sale.payment_method}
                  </span>
                </div>
              </span>
              <span>
                <div className="flex items-center justify-center">
                  <span
                    className={`inline-block p-1 px-2 text-sm rounded-lg font-semibold shadow-sm text-black ${
                      ["bg-amber-400", "bg-lime-400", "bg-rose-500"][sale.status]
                    }`}
                  >
                    {statusMessages[sale.status]}
                  </span>
                </div>
              </span>
              <span className="flex items-center justify-center">{new Date(sale.date).toLocaleDateString("pt-BR")}</span>
              <span>
                <div className="flex items-center justify-center">
                  <Tippy content="Relatório">
                    <a
                      className="action"
                      href={getReportUrl(sale._id)}
                      target="_blank"
                      rel="noreferrer"
                    >
                    <DocumentTextIcon className="size-5" />
                    </a>
                  </Tippy>
                </div>
              </span>
            </section>
          ))}
        </article>
      </div>

      <footer className="flex justify-between my-8 items-center">
        <button
          className="action"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          <ChevronLeftIcon className="size-5" />
          Anterior
        </button>
        <span>{currentPage} / 20 </span>
        <button
          className="action"
          onClick={handleNextPage}
        >
          Próxima
          <ChevronRightIcon className="size-5" />
        </button>
      </footer>
      <FilterProduct open={filteringOpen} setOpen={setFilteringOpen} onSaveFilters={handleSaveFilters} />
    </>
  );
};

export default ListagemVendas;
