import randomstring from 'randomstring'


export const getRandomString = ({
  length = 7,
  charset = 'alphabetic',
  capitalization = 'uppercase',
}) => randomstring.generate({
  length,
  charset,
  capitalization,
})
