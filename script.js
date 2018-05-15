'use strict';

(function(window) {

  // hovered cell coords
  let rowIndex;
  let colIndex;

  // define elements/controls
  const container = document.querySelector('.squares-table');
  const table = container.querySelector('table');
  const addRowButton = container.querySelector('.add-row-btn');
  const addColButton = container.querySelector('.add-col-btn');
  const delRowButton = container.querySelector('.del-row-btn');
  const delColButton = container.querySelector('.del-col-btn');

  // add event listeners
  table.addEventListener('mouseenter', handleMouseEnter);
  container.addEventListener('mouseleave', handleMouseLeave);
  table.addEventListener('mousemove', handleMouseMove);
  addRowButton.addEventListener('click', addRow);
  addColButton.addEventListener('click', addColumn);
  delRowButton.addEventListener('click', deleteRow);
  delColButton.addEventListener('click', deleteColumn);

  function handleMouseEnter() {
    const rowCount = table.querySelectorAll('tr').length;
    const colCount = table.querySelector('tr').children.length;
    if (rowCount > 1) delRowButton.style.visibility = 'visible';
    if (colCount > 1) delColButton.style.visibility = 'visible';
  };

  function handleMouseLeave() {
    setTimeout(function() {
      if (container.querySelector('.del-btn:hover')) return;
      delRowButton.style.visibility = 'hidden';
      delColButton.style.visibility = 'hidden';
    }, 300);
  };

  function handleMouseMove(e) {
    const { offsetTop, offsetLeft, nodeName, cellIndex, parentElement } = e.target;
    if (nodeName === 'TD') {
      delRowButton.style.top = offsetTop + 'px';
      delColButton.style.left = offsetLeft + 'px';
      rowIndex = parentElement.rowIndex;
      colIndex = cellIndex;
    }
  };

  function addRow() {
    const newRow = table.querySelector('tr').cloneNode(true);
    table.querySelector('tbody').appendChild(newRow);
  };

  function addColumn() {
    table.querySelectorAll('tr').forEach((tr) => {
      tr.appendChild(tr.querySelector('td').cloneNode());
    });
  };

  function deleteRow() {
    table.querySelectorAll('tr')[rowIndex].remove();
    delRowButton.style.visibility = 'hidden';
  };

  function deleteColumn() {
    table.querySelectorAll('tr').forEach((tr) => {
      tr.querySelectorAll('td')[rowIndex].remove();
    });
    delColButton.style.visibility = 'hidden';
  };

}(window));
