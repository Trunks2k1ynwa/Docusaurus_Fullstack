function useState<T>(val: T): [() => T, (v: T) => void] {
  return [
    () => val,
    (v: T) => {
      val = v // Gán giá trị mới cho biến stateValue
    }
  ]
}

const [state, setState] = useState('evondev')
const [state1, setState2] = useState(23)

setState('Developer')
console.log(state()) // Kết quả sẽ là 'Developer'

//////////////////////////////
interface Rank<RankItem> {
  item: RankItem
  rank: number
}
function ranker<RankItem>(items: RankItem[], rankCallBack: (v: RankItem) => number): Rank<RankItem>[] {
  const ranks: Rank<RankItem>[] = items.map((item) => ({
    item,
    rank: rankCallBack(item)
  }))
  ranks.sort((a, b) => a.rank - b.rank)
  return ranks.map((rank) => rank)
}
const languages: {
  name: string
  dificutly: number
}[] = [
  {
    name: 'ReactJS',
    dificutly: 60
  },
  {
    name: 'Angular',
    dificutly: 80
  },
  {
    name: 'Vue',
    dificutly: 70
  }
]
const r = ranker([5, 4, 1, 3, 2], (number) => number * 5)
console.log(r)
const rank = ranker(languages, ({ dificutly }) => dificutly)
console.log('rank', rank)
