export const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || `Component`;
};

export const capitalize = (str: string) => {
  const [first, ...rest] = str;
  return first.toUpperCase().concat(...rest);
}

export const getPlural = (n: number, one: string, many: string) => {
  if (n % 10 === 1 && n % 100 !== 11) {
    return one;
  }
  return many;
};

export const getRating = (rating: number) => {
  const formattedRating: number = rating * 100;

  if (formattedRating === 1000) return 'awesome'
  if (formattedRating >= 800) return 'very good'
  if (formattedRating >= 500) return 'good'
  if (formattedRating >= 300) return 'normal'

  return 'bad'
}

export const getHoursAndMinutes = (duration: number) => {
  const minutes = duration % 60;
  const hours = (duration - minutes) / 60;
  return `${hours}h ${minutes}m`
}
