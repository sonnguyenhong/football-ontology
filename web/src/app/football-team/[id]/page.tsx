import { querier } from "@/actions/querier";
import Link from "next/link";
import { notFound } from "next/navigation";
import "@/style/app.css"

export default async function Page({ params }: { params: { id: string } }) {
  const data = await querier.team(params.id);
  if (!data) {
    return notFound();
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          Team:{" "}
          <Link className="text-indigo-500 hover:underline" href={`/national-team/${data.id}`}>
            {data.name}
          </Link>
        </h1>
      </div>
      <div className="flex flex-col md:flex-row gap-10">
        <div className="max-w-[400px] min-w-[400px]">
          <img className="w-full" src={data.image?? "/images/unknown_country.png"} alt="image" />
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
              {data.foundedYear && (
                <tr>
                  <td>
                    <b>Founded Year</b>
                  </td>
                  <td>{data.foundedYear}</td>
                </tr>
              )}
              {data.coach && data.coachName && (
                <tr>
                  <td>
                    <b>Coach By</b>
                  </td>
                  <td>
                    <Link href={data.coach} className="text-sky-500 hover:underline">
                      {data.coachName}
                    </Link>
                  </td>
                </tr>
              )}
              {data.homeField && data.homeFieldName && (
                <tr>
                  <td>
                    <b>Home Field</b>
                  </td>
                  <td>
                    <Link href={data.homeField} className="text-sky-500 hover:underline">
                      {data.homeFieldName}
                    </Link>
                  </td>
                </tr>
              )}
              {data.League.length > 0 && (
                <tr>
                  <td>
                    <b>League seasons</b>
                  </td>
                  <td>
                    <ul className="list-disc mx-4">
                      {data.League.map((item) => {
                        return (
                          <li key={item.ls}>
                            <Link href={item.ls} className="inline text-sky-500 hover:underline">
                              {item.lsName}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </td>
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
                          <li key={item.ms}>
                            <Link href={item.ms} className="inline text-sky-500 hover:underline">
                              {item.msName}
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
