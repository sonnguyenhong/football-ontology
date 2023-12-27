import { querier } from "@/actions/querier";
import { formatNumber } from "@/utils";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const data = await querier.continent(params.id);
  if (!data) {
    return notFound();
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          Continent:{" "}
          <Link className="text-indigo-500 hover:underline" href={`/continent/${data.id}`}>
            {data.name}
          </Link>
        </h1>
      </div>
      <div className="flex flex-col md:flex-row gap-10">
        <div className="max-w-[200px] min-w-[200px]">
          <img className="w-full" src={data.img ?? "/images/unknown_continent.png"} alt="country's flag" />
        </div>
        <div className="flex-grow">
          <table className="w-full">
            <tbody>
              <tr>
                <td className="w-[160px]">
                  <b>Name</b>
                </td>
                <td>{data.name}</td>
              </tr>
              {data.des && (
                <tr>
                  <td>
                    <b>About</b>
                  </td>
                  <td>{data.des}</td>
                </tr>
              )}
              {data.area && (
                <tr>
                  <td>
                    <b>Area</b>
                  </td>
                  <td>
                    {formatNumber(Number(data.area))} km<sup>2</sup>
                  </td>
                </tr>
              )}
              {data.population && (
                <tr>
                  <td>
                    <b>Population</b>
                  </td>
                  <td>{formatNumber(Number(data.population))}</td>
                </tr>
              )}
              {data.league && data.leagueName && (
                <tr>
                  <td>
                    <b>League</b>
                  </td>
                  <td>
                    <Link href={data.league} className="text-sky-500 hover:underline">
                      {data.leagueName}
                    </Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
