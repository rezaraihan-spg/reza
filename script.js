const symbols = ['🍒','🍋','🔔','⭐','🍉','7️⃣','🍇']
let creditsEl = document.getElementById('credits')
let betEl = document.getElementById('bet')
let r1 = document.getElementById('r1')
let r2 = document.getElementById('r2')
let r3 = document.getElementById('r3')
let msg = document.getElementById('message')
let credits = 100
let bet = 1
let spinning = false
let auto = false

function randSym(){ return symbols[Math.floor(Math.random()*symbols.length)] }

function updateUI(){ creditsEl.textContent = credits; betEl.textContent = bet }

function calcPayout(a,b,c){
  if(a===b && b===c) return bet * 10
  if(a===b || b===c || a===c) return bet * 2
  return 0
}

function spinOnce(){
  if(spinning) return
  if(credits < bet){ msg.textContent='Tidak cukup kredit.'; return }
  spinning = true
  msg.textContent='...'
  credits -= bet
  updateUI()

  // animation: quickly cycle symbols then stop
  let cycles = [30, 40, 50]
  let res = []
  const els = [r1,r2,r3]

  els.forEach((el,i)=>{
    let t = 0
    let interval = setInterval(()=>{
      el.textContent = randSym()
      t++
      if(t>=cycles[i]){
        clearInterval(interval)
        res[i]=el.textContent
        // when last stops
        if(res.filter(Boolean).length===3){
          const payout = calcPayout(res[0],res[1],res[2])
          if(payout>0){ credits += payout; msg.textContent = `Menang! +${payout} credits` }
          else { msg.textContent = 'Coba lagi.' }
          updateUI()
          spinning=false
          if(auto) setTimeout(spinOnce, 500)
        }
      }
    }, 40 + i*10)
  })
}

document.getElementById('spin').addEventListener('click', spinOnce)
document.getElementById('bet-inc').addEventListener('click', ()=>{ if(bet<20){ bet++; updateUI() } })
document.getElementById('bet-dec').addEventListener('click', ()=>{ if(bet>1){ bet--; updateUI() } })
document.getElementById('autoplay').addEventListener('click', (e)=>{
  auto = !auto
  e.target.textContent = auto ? 'Stop' : 'Auto'
  if(auto) spinOnce()
})

updateUI()
