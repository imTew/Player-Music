let playlist = [ {
  'title': 'Neo-satán',
  'audio': "assets/18 - Neo-satán.Mp3",
}, {
  'title': 'Exodo-ska',
  'audio': "assets/17 - Exodo-ska.mp3",
}, {
  'title': 'Los buenos deseos',
  'audio': "assets/16 - Los buenos deseos.Mp3",
}, {
  'title': 'El pájaro canta hasta morir',
  'audio': "assets/15 - El pájaro canta hasta morir.Mp3",
}, {
  'title': 'Setentistas',
  'audio': "assets/14 - Setentistas.Mp3",
}, {
  'title': 'Antihumano',
  'audio': "assets/13 - Antihumano.Mp3",
}, {
  'title': 'Reality - Joe',
  'audio': "assets/12 - Reality - Joe.Mp3",
}, {
  'title': 'Arrancacorazones',
  'audio': "assets/11 - Arrancacorazones.Mp3",
}, {
  'title': 'Hey! Hey!',
  'audio': "assets/10 - Hey! Hey!.Mp3",
}, {
  'title': 'La gente que habla sola',
  'audio': "assets/09 - La gente que habla sola.Mp3",
}, {
  'title': 'Surfeando en el soretero',
  'audio': "assets/08 - Surfeando en el soretero.Mp3",
}, {
  'title': 'Iemanja',
  'audio': "assets/07 - Iemanja.Mp3",
}, {
  'title': 'Barreda´s Way',
  'audio': "assets/06 - Barreda´s Way.Mp3",
}, {
  'title': 'Morbo - Porno',
  'audio': "assets/05 - Morbo - Porno.Mp3",
}, {
  'title': 'Los tiburones',
  'audio': "assets/04 - Los tiburones.Mp3",
}, {
  'title': 'Ojos de perro',
  'audio': "assets/03 - Ojos de perro.Mp3",
}, {
  'title': 'Western',
  'audio': "assets/02 - Western.Mp3",
}, {
  'title': 'Echo Fuego',
  'audio': "assets/01 - Echo fuego.Mp3",
}  ];
i = 0;
n = playlist.length;
let player = document.getElementById( 'player' );
let dur = document.getElementById( 'dur' );
playlist.forEach( function( i ) {
  player.src = i.audio;
  $( '.title' ).html( i.title );
}, );

function calculateTotalValue( length ) {
  let minutes = Math.floor( length / 60 ),
    seconds_int = length - minutes * 60,
    seconds_str = seconds_int.toString( ),
    seconds = seconds_str.substr( 0, 2 ),
    time = minutes + ':' + seconds
  return time;
}

function calculateCurrentValue( currentTime ) {
  let current_hour = parseInt( currentTime / 3600 ) % 24,
    current_minute = parseInt( currentTime / 60 ) % 60,
    current_seconds_long = currentTime % 60,
    current_seconds = current_seconds_long.toFixed( ),
    current_time = ( current_minute < 10 ? "0" + current_minute : current_minute ) + ":" + ( current_seconds < 10 ? "0" + current_seconds : current_seconds );
  return current_time;
}

function initProgressBar( ) {
  let length = player.duration;
  let current_time = player.currentTime;
  let totalLength = calculateTotalValue( length )
  jQuery( ".end-time" ).html( totalLength );
  let currentTime = calculateCurrentValue( current_time );
  jQuery( ".start-time" ).html( currentTime );
  dur.value = player.currentTime;
  if ( player.currentTime == player.duration ) {
    $( "#play-btn" ).fadeIn( "slow", function( ) {
      $( this ).removeClass( "fa-pause" );
      $( this ).addClass( "fa-play" );
      dur.value = 0;
    } );
  }
};

function mSet( ) {
  player.currentTime = dur.value;
}

function mDur( ) {
  let length = player.duration;
  dur.max = length;
}

function initPlayers( num ) {
  for ( let i = 0; i < num; i++ ) {
    ( function( ) {
      let playerContainer = document.getElementById( 'player-container' ),
        player = document.getElementById( 'player' ),
        isPlaying = false,
        playBtn = document.getElementById( 'play-btn' );
      if ( playBtn != null ) {
        playBtn.addEventListener( 'click', function( ) {
          togglePlay( )
        } );
      }

      function togglePlay( ) {
        if ( player.paused === false ) {
          player.pause( );
          isPlaying = false;
          $( "#play-btn" ).fadeIn( "slow", function( ) {
            $( this ).removeClass( "fa-pause" );
            $( this ).addClass( "fa-play" );
          } );
        }
        else {
          player.play( );
          $( "#play-btn" ).fadeIn( "slow", function( ) {
            $( this ).removeClass( "fa-play" );
            $( this ).addClass( "fa-pause" );
          } );
          isPlaying = true;
        }
      }
    }( ) );
  }
}
$( "#next" ).data( 'dir', 1 );
$( "#prev" ).data( 'dir', -1 );
$( '#next, #prev' ).on( 'click', function( ) {
  i = ( i + $( this ).data( 'dir' ) + n ) % n;
  console.log( i );
  player.src = playlist[ i ].audio;
  $( '.title' ).html( playlist[ i ].title );
  $( '#play-btn' ).removeClass( "fa-play" );
  $( '#play-btn' ).addClass( "fa-pause" );
  player.play( );
} );
$( ".audio-player" )
  .toArray( )
  .forEach( function( player ) {
    let audio = $( player ).find( "audio" )[ 0 ];
    let volumeControl = $( player ).find( ".volumeControl .wrapper" );
    volumeControl.find( ".outer" ).on( "click", function( e ) {
      let volumePosition = e.pageX - $( this ).offset( ).left;
      let audioVolume = volumePosition / $( this ).width( );
      if ( audioVolume >= 0 && audioVolume <= 1 ) {
        audio.volume = audioVolume;
        $( this )
          .find( ".inner" )
          .css( "width", audioVolume * 100 + "%" );
      }
    } );
  } );

initPlayers( jQuery( '#player-container' ).length );
