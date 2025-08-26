"use client";
import React from "react";

export default function Pagination({ currentPage, totalPages, onPageChange, rowsPerPage, onRowsPerPageChange, totalItems }: { currentPage: number; totalPages: number; onPageChange: (n:number)=>void; rowsPerPage:number; onRowsPerPageChange:(n:number)=>void; totalItems:number; }) {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const endItem = Math.min(currentPage * rowsPerPage, totalItems);

  return (
    <div className="flex items-center justify-end gap-10 mt-4">
      <div className="flex items-center">
        <span className="text-sm text-gray-700 mr-2">Rows per page:</span>
        <select value={rowsPerPage} onChange={(e)=> onRowsPerPageChange(Number(e.target.value))} className="form-select border-gray-300 rounded-md shadow-sm">
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-700">{startItem}-{endItem} of {totalItems}</span>
        <button onClick={()=> onPageChange(currentPage-1)} disabled={currentPage===1} className={`p-1 rounded-md ${currentPage===1 ? "text-gray-400" : "text-gray-700 hover:bg-gray-100"}`}>‹</button>
        <button onClick={()=> onPageChange(currentPage+1)} disabled={currentPage===totalPages} className={`p-1 rounded-md ${currentPage===totalPages ? "text-gray-400" : "text-gray-700 hover:bg-gray-100"}`}>›</button>
      </div>
    </div>
  );
}
