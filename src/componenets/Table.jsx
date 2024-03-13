import { twMerge } from "tailwind-merge";

export default function Table({ config, datas, TheadClass, TbodyClass }) {
  const tHeadClass = twMerge(
    "text-lg text-center align-middle text-white",
    TheadClass
  );
  const tBodyClass = twMerge(
    "text-lg text-center align-middle py-1.5",
    TbodyClass
  );

  const rederedThead = config.map((column) => (
    <th className={tHeadClass} key={column.label}>
      {column.label}
    </th>
  ));

  const renderedTbody =
    datas &&
    datas.map((row, index) => (
      <tr key={row.id}>
        {config.map((column) => (
          <td className={tBodyClass} key={column.label}>
            {column.render(row, index)}
          </td>
        ))}
      </tr>
    ));

  return (
    <div>
      <div className="overflow-x-auto shadow rounded w-full">
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
