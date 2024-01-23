function Table({ config, datas }) {
  const rederedThead = config.map((column) => (
    <th key={column.label}>{column.label}</th>
  ));
  const renderedTbody = datas.map((row) => (
    <tr key={row.id}>
      {config.map((column) => (
        <td key={column.label}>{column.render(row)}</td>
      ))}
    </tr>
  ));

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>{rederedThead}</tr>
          </thead>
          <tbody>{renderedTbody}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
