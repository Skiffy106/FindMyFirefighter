"use client";
import { CodeItem, FormRequestType } from "@/types/types";
import { useState } from "react";

const Forests: CodeItem[] = [
  { name: "Los Padres", code: "LPF" },
  { name: "Angeles", code: "ANF" },
  { name: "Cleveland", code: "CNF" },
  { name: "San Bernardino", code: "SBNF" },
  { name: "Sequoia", code: "SQF" },
  { name: "Sierra", code: "SNF" },
  { name: "Six Rivers", code: "SRF" },
  { name: "Stanislaus", code: "STF" },
  { name: "Tahoe", code: "TNF" },
  { name: "Klamath", code: "KNF" },
  { name: "Lassen", code: "LNF" },
  { name: "Mendocino", code: "MNF" },
  { name: "Modoc", code: "MDF" },
  { name: "Plumas", code: "PNF" },
  { name: "Humboldt-Toiyabe", code: "HTF" },
  { name: "Inyo", code: "INF" },
  { name: "Lake Tahoe Basin Mgt Unit", code: "LTBMU" },
  { name: "Lassen Volcanic", code: "LAVO" },
  { name: "Mendocino", code: "MNF" },
  { name: "Modoc", code: "MDF" },
  { name: "Plumas", code: "PNF" },
  { name: "Tahoe", code: "TNF" },
  { name: "Humboldt-Toiyabe", code: "HTF" },
  { name: "Inyo", code: "INF" },
  { name: "Lake Tahoe Basin Mgt Unit", code: "LTBMU" },
  { name: "Lassen Volcanic", code: "LAVO" },
  { name: "Mendocino", code: "MNF" },
  { name: "Modoc", code: "MDF" },
]

const Units: CodeItem[] = [
  { name: "Crew", code: "CRW" },
  { name: "Engine", code: "ENG" },
  { name: "Handcrew", code: "HC" },
  { name: "Helitack", code: "HT" },
  { name: "Hotshot", code: "HS" },
  { name: "Module", code: "MOD" },
  { name: "Overhead", code: "OH" },
  { name: "Patrol", code: "PAT" },
  { name: "Prescribed Fire", code: "RX" },
  { name: "Saw", code: "SAW" },
  { name: "Smokejumper", code: "SMK" },
]

export default function Home() {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch('/api', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setMessage('Form submitted successfully');
      } else {
        setMessage('Error submitting form');
      }
    } catch (error: unknown) {
      setMessage('Error submitting form: ' + error);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[url('/background.jpg')] bg-cover bg-center">
      <div className="bg-white shadow-md rounded-lg p-8 space-y-4">
        <form onSubmit={handleSubmit} className="flex flex-col h-full items-center justify-center space-y-4">
          <input type="hidden" name="requestType" value={FormRequestType.ForestRequest} />
          <div className="flex items-center space-x-4">
            <label htmlFor="forest" className="text-xl text-right w-64">Enter the Forest Name:</label>
            <select name="forest" id="forest" className="text-lg w-64" >
              {Forests.map(({ name, code }, i) => (
                <option key={i} value={code}>{name}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="text-lg bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
        </form>
        <div className="w-full bg-slate-300 h-0.5 rounded"></div>
        <form onSubmit={handleSubmit} className="flex flex-col h-full items-center justify-center space-y-4">
          <input type="hidden" name="requestType" value={FormRequestType.UnitTypeRequest} />
          <div className="flex items-center space-x-4">
            <label htmlFor="unitType" className="text-xl text-right w-64">Enter the Unit Type:</label>
            <select name="unitType" id="units" className="text-lg w-64">
              {Units.map(({ name, code }, i) => (
                <option key={i} value={code}>{name}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="text-lg bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
        </form>
        <div className="w-full bg-slate-300 h-0.5 rounded"></div>
        <form onSubmit={handleSubmit} className="flex flex-col h-full items-center justify-center space-y-4">
          <input type="hidden" name="requestType" value={FormRequestType.UnitNumberRequest} />
          <div className="flex items-center space-x-4">
            <label htmlFor="unitNumber" className="text-xl">Enter the Unit Number:</label>
            <input className="text-lg" type="text" name="unitNumber" id="unit-number" placeholder="Ex. Engine" />
          </div>
          <button type="submit" className="text-lg bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
        </form>
        <div className="">
          <span className="text-lg">{!!message ? message : ""}</span>
        </div>
      </div>
    </div>
  )
};