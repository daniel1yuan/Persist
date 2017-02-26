def habits_arr(in_str):
  results = in_str.split(',')[1:]
  results = [int(i) for i in results]
  return results
