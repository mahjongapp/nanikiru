import Image from 'next/image'

type Props = {
  name: string
  width: number
}

export default function MahjongTailIcon({ name, width }: Props) {
  console.log(name)
  return (
    <Image
      width={width}
      height={(width / 3) * 4}
      alt={`${name}`}
      src={`/mahjong-icon/${name}.png`}
    />
  )
}
