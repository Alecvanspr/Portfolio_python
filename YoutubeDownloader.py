from pytube import YouTube

link = input("Enter the link:")
yt = YouTube(link)

#title
print("titel: ", yt.title)

#lengte van de video
print("Lengte: ",yt.length, " secondes")

#hierbij wordt de hoogste video gedownload
ys= yt.streams.get_highest_resolution()

print("De video ",yt.title," wordt gedownload")
#dit zorgt dat de video wordt gedownload bij de gevraagde locatie
ys.download("Downloads\Geluiden voor het soundboard")
print("De download is voltooid")