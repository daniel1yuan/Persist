def habits_arr(in_str):
  results = in_str.split(',')[1:]
  results = [int(i) for i in results]
  return results

def arr_str(arr):
  result = ""
  for i in arr:
    result += "," + str(i)
  return result
