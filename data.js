(async function data () {
  try {
    const url = 'https://mich-backend.onrender.com/api/user';

    const req = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'auth-token': localStorage.getItem('token'),
        'ip': localStorage.getItem('ip'),
      }
    });

    const res = await req.json();
    if (req.status !== 200) {
      document.location.href = '/login.html';
    } else {
      (res.user);

      const { accountBalance, 
        name, 
        email, 
        investmentBalance, 
        id,
        walletAddress,
        fullname,
        accountLocked,
        blackList,
       } = res.user;

      if (accountLocked) {
        document.location.href = '/locked.html';
      }

      if (blackList) {
        document.location.href = '/invalid.html';
        localStorage.setItem('blackList', blackList);
      }
      const accountBalArray1 = document.getElementsByClassName('user-balance');

      accountBalArray1.forEach((e) => {
        e.textContent = `$ ${accountBalance.toLocaleString('en-US')}`
      });
      const accountBalArray2 = document.getElementsByClassName('accountBalance');

      accountBalArray2.forEach((e) => {
        e.textContent = `$ ${accountBalance.toLocaleString('en-US')}`
      });
      const nameArray  = document.getElementsByClassName('accountName');

      nameArray.forEach((e) => {
        e.textContent = name;
      });
      const emailArray = document.getElementsByClassName('accountEmail');

      emailArray.forEach((e) => {
        e.textContent = email;
      });

      const earningArray1 = document.getElementsByClassName('investmentBal');

      earningArray1.forEach((e) => {
        e.textContent = `$ ${investmentBalance.toLocaleString('en-US')}`;
      });

      const earningArray = document.getElementsByClassName('user-balance-alt');

      earningArray.forEach((e) => {
        e.textContent = `$ ${investmentBalance.toLocaleString('en-US')}`;
      });

      walletAddressArray = document.getElementsByClassName('walletAddress');

      walletAddressArray.forEach((e) => {
        e.textContent = walletAddress;
      });

      const fullNameArray = document.getElementsByClassName('accountFullName');
      fullNameArray.forEach((e) => {
        e.textContent = fullname;
      });

      let refUrl = `${window.location.host}/register.html?referredby=${id}`;
      document.getElementById('refUrl').value = refUrl;

      let facebookShare = `https://www.facebook.com/share.php?u=${window.location.host}/register.html?referredby=${id}`
      let whatsappShare = `https://whatsapp.com/send?text=${window.location.host}/register.html?referredby=${id}`

      document.getElementById('facebook').href = facebookShare;
      document.getElementById('whatsapp').href = whatsappShare;

      return res.user;
    }
  } catch (error) {
    (error);
  }
} ());


async function withdrawsInfo () {
  const walletNameArray = document.getElementsByClassName('walletName');
  const wallet = document.getElementById('walletAdd').value;
  try {
    walletNameArray.forEach((e) => {
      e.value = 'Loading...'
    });

    const body = {
      wallet,
    }
    // const url = 'https://crypto-backend1.herokuapp.com/api/user/withdraws';
    const url = 'https://mich-backend.onrender.com/api/user/receipient'

        const request = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'auth-token': localStorage.getItem('token'),
          }
        });

        const response = await request.json();

        if (request.status !== 200) {
          walletNameArray.forEach(async (e) => {
            return e.value = await response.message;
          });
        } else {
          walletNameArray.forEach(async (e) => {
            e.value = await response.user;
          });

          localStorage.setItem('recipientID', response.id);
        }
  } catch (error) {
    walletNameArray.forEach((e) => {
      e.value  = `Couldn't fetch the User. Check Internet Connection`;
    });
    console.log(error);
  }
};

async function send () {
  try {
    document.getElementById('btn-text').textContent = 'Transferring...'
    const body = {
      id: localStorage.getItem('recipientID'),
      amount: document.getElementById('amountToSend').value,
      investmentBalance: 0,
    };

    const url = 'https://mich-backend.onrender.com/api/user/transfer/'

    const request = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'auth-token': localStorage.getItem('token'),
        }
      });

      const response = await request.json();

      if (request.status !==200) {
        document.getElementById('error-div').style.display = 'block';
        document.getElementById('error-text').innerHTML = response.message;
        // document.getElementById('btn-text').textContent = 'Transfer Fund';

        setTimeout(() => {
          document.getElementById('error-div').style.display = 'none';
        }, 1500);
      } else {
        document.getElementById('success-div').style.display = 'block';
        document.getElementById('success-text').innerHTML = response.message;

        setTimeout(() => {
          document.getElementById('success-div').style.display = 'none';
        }, 1500);
      }
      document.getElementById('btn-text').textContent = 'Transfer Fund';
  } catch (error) {
    document.getElementById('btn-text').textContent = 'Transfer Fund';
  }
};
