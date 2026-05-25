interface ReleaseVersionProps {
  version: string;
  releaseDate: Date;
}

export default function ReleaaseVersion({ version, releaseDate }: ReleaseVersionProps) {

  const dateFormat = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year:'numeric'
  })

  return (
    <td className="py-8 align-top">
      <p className="text-lg font-normal">
        <span>{version}</span>
        <br />
        <time datetime={releaseDate.toISOString()}>{dateFormat.format(releaseDate)}</time>
      </p>
    </td>
  );
}
