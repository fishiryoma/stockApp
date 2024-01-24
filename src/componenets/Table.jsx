function Table({ config, datas }) {
  const rederedThead = config.map((column) => (
    <th className="text-lg text-center align-middle" key={column.label}>
      {column.label}
    </th>
  ));
  const renderedTbody = datas.map((row) => (
    <tr key={row.id}>
      {config.map((column) => (
        <td className="text-lg text-center align-middle" key={column.label}>
          {column.render(row)}
        </td>
      ))}
    </tr>
  ));

  return (
    <div>
      <div className="overflow-x-auto shadow rounded">
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
