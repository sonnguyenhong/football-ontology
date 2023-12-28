import { querier } from "@/actions/querier";
import Link from "next/link";
import { notFound } from "next/navigation";
import "@/style/app.css"

export default async function Page({ params }: { params: { id: string } }) {
  const data = await querier.league(params.id);
  if (!data) {
    return notFound();
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          League:{" "}
          <Link className="text-indigo-500 hover:underline" href={`/league/${data.id}`}>
            {data.name}
          </Link>
        </h1>
      </div>
      <div className="flex flex-col md:flex-row gap-10">
        <div className="max-w-[200px] min-w-[200px]">
          <img className="w-full" src={data.img ?? "/images/unknown_country.png"} alt="league's thumbnail" />
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
              {data.numTeams && (
                <tr>
                  <td>
                    <b>Number Teams</b>
                  </td>
                  <td>{data.numTeams}</td>
                </tr>
              )}
              {data.Match.length > 0 && (
                <tr>
                  <td>
                    <b>Match seasons</b>
                  </td>
                  <td>
                    <ul className="list-disc mx-4">
                      {data.Match.map((item) => {
                        return (
                          <li key={item.match}>
                            <Link href={item.match} className="inline text-sky-500 hover:underline">
                              {item.matchName}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
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