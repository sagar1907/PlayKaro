console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let loop =false;
let shuffleOn=false;
let songPageON=false;

let HomeOrSongPage=()=>{
    songPageON=!songPageON;
    if(songPageON){
    HomePage.style.display ="none"
    songPage.style.display ="flex";
    }else{
        HomePage.style.display="block";
        songPage.style.display="none";
    }
}
let musicvolume=document.getElementById('volume');
let titleimage=document.getElementById('track_image');
let returnToHomePage=document.getElementById('returnToHomePage');
let songPagePlay =document.getElementById('play');
let audioElement = new Audio('songs/1.mp3');
let HomePage=document.getElementById('HomePage');
let songPage=document.getElementById('SongPage');
songPage.style.display = 'none';
let masterPlay = document.getElementById('masterPlay');
let masterPlay2 = document.getElementById('play');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName2 = document.getElementById('masterSongName2');
let masterSongName = document.getElementById('masterSongName');
document.getElementById('shuffleButton').style.color = "black";
document.getElementById('shuffleButton').style.backgroundColor = "darkcyan";
document.getElementById('loopButton').style.color = "black";
        document.getElementById('loopButton').style.backgroundColor = "darkcyan";
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    {songName: "Baarish ki Jaye", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Bholenath", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Otilia Bilionera", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Mummy Nu Pasand", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Kale Je Libas-Kaka", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Sher Aya", filePath: "songs/2.mp3", coverPath: "covers/6.jpg"},
    {songName: "Left-Right", filePath: "songs/2.mp3", coverPath: "covers/7.jpg"},
    {songName: "Temporary Pyar", filePath: "songs/2.mp3", coverPath: "covers/8.jpg"},
    {songName: "Mann Bharrya", filePath: "songs/2.mp3", coverPath: "covers/9.jpg"},
    {songName: "Tera Baap aya", filePath: "songs/4.mp3", coverPath: "covers/10.jpg"},

]


musicvolume.addEventListener("change",(e)=>{
    console.log(e.target.value/100);
    audioElement.volume=e.target.value/100;
    document.getElementById("volume_show").innerText=e.target.value
})

masterSongName.addEventListener('click',HomeOrSongPage)
returnToHomePage.addEventListener('click',HomeOrSongPage)

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

masterPlay2.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        console.log(masterPlay2);
        console.log(masterPlay2.classList);
        masterPlay2.classList.remove('fa-play-circle');
        masterPlay2.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        masterPlay2.classList.remove('fa-pause-circle');
        masterPlay2.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }})

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        masterPlay2.classList.remove('fa-play-circle');
        masterPlay2.classList.add('fa-pause-circle');
        gif.style.opacity = 1; 
        
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        masterPlay2.classList.remove('fa-pause-circle');
        masterPlay2.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

audioElement.addEventListener("ended",()=>{
    if(loop===false){
        audioElement.currentTime=0;
        playNext();
    }else{
        audioElement.currentTime=0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
});
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
    myProgressBar2.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

document.getElementById('myProgressBar2').addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar2.value * audioElement.duration/100;})
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

let playNext=()=>{
    if(shuffleOn){
        songIndex=Math.floor(Math.random() * 10);
    }
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    masterSongName2.innerText = songs[songIndex].songName;
    titleimage.src= songs[songIndex].coverPath;

    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
}
document.getElementById('next').addEventListener('click',playNext);
document.getElementById('next2').addEventListener('click',playNext);
let playLast=()=>{
        if(songIndex<=0){
            songIndex = 0
        }
        else{
            songIndex -= 1;
        }
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        masterSongName2.innerText = songs[songIndex].songName;
        titleimage.src= songs[songIndex].coverPath;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
}
document.getElementById('previous').addEventListener('click',playLast)
document.getElementById('pre2').addEventListener('click',playLast)


document.getElementById('shuffleButton').addEventListener('click',()=>{
   shuffleOn=!shuffleOn
   loop=false;
   if(shuffleOn){
    document.getElementById('shuffleButton').style.backgroundColor = "black";
    document.getElementById('shuffleButton').style.color = "darkcyan";

   }else{
    document.getElementById('shuffleButton').style.color = "black";
    document.getElementById('shuffleButton').style.backgroundColor = "darkcyan";

   }
})

document.getElementById('loopButton').addEventListener('click',()=>{
    loop=!loop
    if(loop){
        document.getElementById('loopButton').style.backgroundColor = "black";
    document.getElementById('loopButton').style.color = "darkcyan";

       }else{
        document.getElementById('loopButton').style.color = "black";
        document.getElementById('loopButton').style.backgroundColor = "darkcyan";
       }
 })
let lastvolume=100;
volumeicon=document.getElementById('volume_icon');
function mute_sound(){
    if(audioElement.volume === 0){
        audioElement.volume = lastvolume/100;
	    volume.value = lastvolume;
	    volume_show.innerHTML = lastvolume;
        console.log(volumeicon.classList);
        volumeicon.classList.remove("fa-volume-mute")
        volumeicon.classList.add("fa-volume-up")


    }else{
        lastvolume=parseInt(audioElement.volume*100);
        audioElement.volume = 0;
	    volume.value = 0;
        volume_show.innerHTML = 0;
        console.log(volumeicon.classList);
        volumeicon.classList.remove("fa-volume-up")
        volumeicon.classList.add("fa-volume-mute")
    }
	
}