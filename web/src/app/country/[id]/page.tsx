import { querier } from "@/actions/querier";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const data = await querier.country(params.id);
  if (!data) {
    return notFound();
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          Country:{" "}
          <Link className="text-indigo-500 hover:underline" href={`/country/${data.id}`}>
            {data.name}
          </Link>
        </h1>
      </div>
      <div className="flex flex-col md:flex-row gap-10">
        <div className="max-w-[200px] min-w-[200px]">
          <img className="w-full" src={data.img ?? "/images/unknown_country.png"} alt="country's flag" />
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
              {data.team && data.teamName && (
                <tr>
                  <td>
                    <b>Team</b>
                  </td>
                  <td>
                    <Link href={data.team} className="text-sky-500 hover:underline">
                      {data.teamName}
                    </Link>
                  </td>
                </tr>
              )}
              {data.area && data.areaName && (
                <tr>
                  <td>
                    <b>Continent</b>
                  </td>
                  <td>
                    <Link href={data.area} className="text-sky-500 hover:underline">
                      {data.areaName}
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
