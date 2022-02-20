import matplotlib.pyplot as plt
import numpy as np

import pandas as pd

df = pd.ExcelFile("Data.xlsx")
data=df.parse("Blad1")
print(data.head(24))

xarray = [0]
yarray = [0]
i = 0

for x in data[10]:
    xarray.append(i)
    yarray.append(x)
    i=i+1


xpoints = np.array(xarray)
ypoints = np.array(yarray)

plt.plot(xpoints, ypoints)
plt.show()