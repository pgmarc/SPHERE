interface ReleaseVersionProps {
  version: string;
  releaseDate: string;
}

export default function ReleaaseVersion({ version, releaseDate }: ReleaseVersionProps) {
  return (
    <td className="py-8 align-top">
      <p className="text-lg font-normal">{version}</p>
      <p className="text-lg font-normal">{releaseDate}</p>
    </td>
  );
}
