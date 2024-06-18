import React, { useContext } from "react";
import {
  ChevronDownIcon,
  CurrencyDollarIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
  PrinterIcon,
  DocumentTextIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import { TitleContext } from "../App";
import ListingFilter from "../components/ListingFilter";

const ListagemVendas = () => {
  const setTitle = useContext(TitleContext);
  setTitle("Vendas");

  // status: finalizado, pendente, cancelado
  const statusMessages = ["Finalizado", "Pendente", "Cancelado"];
  const sales = [
    {
      id: 1,
      client: "Hikari",
      shipping: 10,
      shippingProvider: "SEDEX",
      total: 50,
      payment: "Dinheiro",
      date: "2021-10-10",
      status: 0,
    },
    {
      id: 1,
      client: "Amity",
      shipping: 10,
      shippingProvider: "Correios",
      total: 50,
      payment: "PIX",
      date: "2021-10-10",
      status: 0,
    },
    {
      id: 1,
      client: "Augusto",
      shipping: 10,
      shippingProvider: "Loggi",
      total: 50,
      payment: "Débito",
      date: "2021-10-10",
      status: 2,
    },
    {
      id: 1,
      client: "Willow",
      shipping: 10,
      shippingProvider: "Correios",
      total: 50,
      payment: "Crédito 3X",
      date: "2021-10-10",
      status: 1,
    },
  ];

  return (
    <>
      <ListingFilter>
        <span className="flex items-center text-slate-600 flex-1 gap-1">
          <MagnifyingGlassIcon className="size-4" />
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Pesquise"
            maxLength={90}
            className="w-full placeholder:text-slate-500"
          />
        </span>
        <input
          type="date"
          name="date"
          id="date"
          className="empty:text-slate-500"
        />

        <button className="flex items-center text-slate-600 gap-1 relative group cursor-pointer">
          <CurrencyDollarIcon className="size-4" />
          <span>Preço</span>
          <ChevronDownIcon className="size-4 ml-4" />

          <div className="panel left-0 top-10">
            <input
              type="range"
              name="price"
              id="price"
              className="accent-alt-dimm"
            />
            <div className="flex justify-between text-sm">
              <span>R$10,00</span>
              <span>R$500,00</span>
            </div>
          </div>
        </button>

        <button className="flex items-center text-slate-600 gap-1 relative group cursor-pointer">
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
        <button className="action">
          <PlusCircleIcon className="size-5" />
          Adicionar
        </button>
        <button className="action">
          <PrinterIcon className="size-5" />
          Imprimir
        </button>
      </header>

      <article className="grid grid-cols-8 content-start">
        <header className="listing grid-cols-8 col-span-8 text-slate-500">
          <span>
            <span className="bg-slate-300 rounded-lg px-2">#</span>
          </span>
          <span>Cliente</span>
          <span>Frete</span>
          <span>Total</span>
          <span>Pagamento</span>
          <span>Status</span>
          <span>Data</span>
          <span>Ações</span>
        </header>

        {sales.map((sale) => (
          <section className="grid grid-cols-subgrid col-span-8 pl-[9px] my-3 *:ml-2">
            <span>
              <span className="bg-slate-300 rounded-lg px-2 text-slate-500 text-sm">
                {sale.id}
              </span>
            </span>
            <span>{sale.client}</span>
            <span>
              R${sale.shipping}{" "}
              <span className="bg-slate-200 text-slate-400 text-sm rounded-lg px-2">
                {sale.shippingProvider}
              </span>
            </span>
            <span>R${sale.total}</span>
            <span>{sale.payment}</span>
            <span>
              <span
                className={`p-1 px-2 text-sm rounded-lg font-semibold shadow-sm ${
                  [
                    "bg-lime-400 text-lime-900",
                    "bg-amber-400 text-amber-800",
                    "bg-rose-500 text-rose-900",
                  ][sale.status]
                }`}
              >
                {statusMessages[sale.status]}
              </span>
            </span>
            <span>{sale.date}</span>

            <span className="flex gap-2">
              <button>
                <DocumentTextIcon className="size-5" />
              </button>
              <button>
                <EnvelopeIcon className="size-5" />
              </button>
            </span>
          </section>
        ))}
      </article>
    </>
  );
};

export default ListagemVendas;
