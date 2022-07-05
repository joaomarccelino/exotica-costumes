const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
const years = ['23', '24', '25', '26', '27', '28', '29', '30', '31', '32']
const paymentOptions = [
  {
    name: 'Pagamento à vista',
    portion: 1
  },
  {
    name: '2x',
    portion: 2
  },
  {
    name: '3x',
    portion: 3
  }
]

const shipping = 56.90;

const gender = ['Mulher Cis', 'Homem Cis', 'Mulher Trans', 'Homem Trans', 'Não-binárie', 'Outro', 'Prefiro não informar'];

const categories = ["Moda Íntima", "SexShop"];

const subCategories = ["Sutiã", "Calcinha", "Body", "Modelador", "Plus", "Linha Noite", "Estimulantes", "Massagem", "Fantasias", "Próteses"];

const sizePatternP = ['PP', 'P', 'M', 'G', 'GG', 'GGG'];
const sizePatternN = [38, 40, 42, 44, 46, 48];

const brStates = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
]

export {
  months,
  years,
  paymentOptions,
  shipping,
  gender,
  sizePatternP,
  sizePatternN,
  categories,
  subCategories,
  brStates
}