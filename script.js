'use strict';

(function(window) {
  // hovered row and column indexes
  let rowIndex, colIndex;

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
    delRowButton.style.visibility = 'visible';
    delColButton.style.visibility = 'visible';
  };

  function handleMouseLeave() {
    setTimeout(function() {
      if (container.querySelector('table:hover')) return;
      if (container.querySelector('.del-btn:hover')) return;
      delRowButton.style.visibility = 'hidden';
      delColButton.style.visibility = 'hidden';
    }, 200);
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
    actionCallback();
  };

  function addColumn() {
    table.querySelectorAll('tr').forEach((tr) => {
      tr.appendChild(tr.querySelector('td').cloneNode());
    });
    actionCallback();
  };

  function deleteRow() {
    table.querySelectorAll('tr')[rowIndex].remove();
    actionCallback();
  };

  function deleteColumn() {
    table.querySelectorAll('tr').forEach((tr) => {
      tr.querySelectorAll('td')[rowIndex].remove();
    });
    actionCallback();
  };

  function actionCallback() {
    delRowButton.style.display = table.querySelectorAll('tr')[1] ? 'block' : 'none';
    delColButton.style.display = table.querySelector('tr').children[1] ? 'block' : 'none';
    delRowButton.style.visibility = 'hidden';
    delColButton.style.visibility = 'hidden';
  }
}(window));
