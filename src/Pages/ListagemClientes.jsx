import React, { useState } from "react";
import {
  ArrowTopRightOnSquareIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  FunnelIcon,
  LockClosedIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  PrinterIcon,
} from "@heroicons/react/24/outline";
import { useContext, useEffect } from "react";
import { TitleContext } from "../App";
import ListingFilter from "../components/ListingFilter";
import { Link } from "react-router-dom";
import { listUsersByRole } from "../lib/query";
import { useAuth } from "../lib/auth";

function ListagemClientes() {
  useAuth();
  const setTitle = useContext(TitleContext);
  setTitle("Clientes");

  const [activeTab, setActiveTab] = useState("Todos");
  const [users, setUsers] = useState([]);
  const [registerOpen, setRegisterOpen] = useState(false);

  useEffect(() => {
    listUsersByRole(["cpf", "cnpj"]).then(setUsers).catch(console.error);
  }, []);

  return (
    <>
      <div className="flex gap-2 border-b mb-4">
        <button
          onClick={() => {
            setActiveTab("Todos");
            listUsersByRole(["cpf", "cnpj"])
              .then(setUsers)
              .catch(console.error);
          }}
          className={`px-4 py-2 text-lg ${
            activeTab === "Todos" ? "border-b-2 border-yellow-light" : ""
          }`}
        >
          Todos
        </button>
        <button
          onClick={() => {
            setActiveTab("Pessoa Física");
            listUsersByRole(["cpf"]).then(setUsers).catch(console.error);
          }}
          className={`px-4 py-2 text-lg ${
            activeTab === "Pessoa Física"
              ? "border-b-2 border-yellow-light"
              : ""
          }`}
        >
          Pessoa Física
        </button>
        <button
          onClick={() => {
            setActiveTab("Pessoa Jurídica");
            listUsersByRole(["cnpj"]).then(setUsers).catch(console.error);
          }}
          className={`px-4 py-2 text-lg ${
            activeTab === "Pessoa Jurídica"
              ? "border-b-2 border-yellow-light"
              : ""
          }`}
        >
          Pessoa Jurídica
        </button>
      </div>

      <ListingFilter>
        <span className="flex items-center text-slate-600 flex-1 gap-1">
          <MagnifyingGlassIcon className="size-4" />
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Pesquise"
            maxLength={100}
            className="w-full placeholder:text-slate-500 focus:outline-none"
          />
        </span>
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
        <article className="grid grid-cols-[90px_minmax(150px,1fr)_120px_minmax(180px,1fr)_150px_minmax(200px,1fr)_120px_90px_...]">
          <header className="listing col-span-8 text-slate-500">
            <span>
              <span className="bg-slate-200 rounded-lg px-2">#</span>
            </span>
            <span>Nome</span>
            <span>Tel</span>
            <span>Email</span>
            <span>CPF/CNPJ</span>
            <span>Endereço</span>
            <span>Cidade/UF</span>
            <span>Ações</span>
          </header>

          {users.map((user) => (
            <section
              className="grid grid-cols-subgrid col-span-8 pl-[9px] my-3 *:ml-2"
              key={user._id}
            >
              <span className="w-8">
                <span className="bg-slate-200 rounded-lg px-2 text-slate-500 text-sm truncate w-8 max-w-8">
                  {user._id.slice(0, 6)}...
                </span>
              </span>
              <span className="text-nowrap truncate">{user.name}</span>
              <span>{user.tel}</span>
              <span>{user.email}</span>
              <span>{user.cpf}</span>
              <span>{user.addr}</span>
              <span>{user.uf}</span>
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

export default ListagemClientes;
