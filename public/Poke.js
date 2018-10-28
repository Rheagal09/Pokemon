$(document).ready(function(){
	let dd=$('#Amount');
	let AmtBtn=$("#Amt-Btn");
	let inptAmt=$("#inpt-Amt");
	let SearchBtn=$("#SearchBtn");
	let container=$('#container');
	let InpSearch=$("#InpSearch");
	let TableDiv=$('#TableDiv');
	let ResultBody=$('#ResultBody');
	let count=0;
	let SelectedAmt=1;
	let SelectedFilter='name';
	let SelectedFilterEx='none';
	dd.find('a').click(function(){
		var param=$(this).attr("href").replace("#","");
		var con=$(this).text();
		SelectedAmt=con;
		AmtBtn.text(con);
		inptAmt.val(param);
		console.log(inptAmt.val());
	})
	let Row=$('#SearchRow');
	let inptFilter=$("#inpt-Filter");
	let FilterBtn=$("#Filter-Btn");
	let Filter=$('#Filter');
	Filter.find('a').click(function(){
		var param=$(this).attr("href").replace("#","");
		var con=$(this).text();
		SelectedFilter=param;
		FilterBtn.text(con);
		inptFilter.val(param);
		console.log(inptFilter.val());
		console.log(con);
		if((con=='Types'|| con=='Resistances'|| con=='Weaknesses'||con=='Rarity')&&count<1){
			console.log('Fired');
			let Col=document.createElement('div');
			Col.className='col-md-2';
			let drop=document.createElement('div');
			drop.className='dropdown';
			let dropBtn=document.createElement('button');
			$(dropBtn).attr({"type":'button','data-toggle':'dropdown','id':'TypeBtn'});
			dropBtn.className='btn btn-primary btn-lg dropdown-toggle';
			let car=document.createElement('span');
			car.className='caret';
			let TypeList=document.createElement('ul');
			TypeList.className='dropdown-menu';
			$(TypeList).attr('id','Type');
			let TypeL=[];
			if(con!='Rarity')
			TypeL=['Psychic','Dark',"Electric",'Bug',
						'Water','Ground','Fire','Fairy',
						'Fighting','Ghost','Dragon','Grass',
						'Flying','Steel','Ice','Rock',
						'Normal','Poison'];
			else
				TypeL=['Common','Rare'];
			if(con!='Rarity')
			for(let i=0;i<18;i++)
				createLi(TypeL[i]);
			else for(let i=0;i<2;i++)
				createLi(TypeL[i]);
			function createLi(value){
				let li=document.createElement('li');
				let Anchor=document.createElement('a');
				$(Anchor).attr('href',"#"+value);
				let txt=document.createTextNode(value);
				$(Anchor).append(txt);
				$(li).append(Anchor);
				$(TypeList).append(li);
			}
			let TextType=document.createTextNode('Types');
			let inptType=$('#inpt-Type');
			$(dropBtn).append(TextType);
			$(dropBtn).append(car);
			$(drop).append(dropBtn);
			$(drop).append(TypeList);
			$(Col).append(drop);
			Row.append(Col);
			count=count+1;
			$(TypeList).find('a').click(function(){
				let param=$(this).attr("href").replace("#","");
				let con=$(this).text();
				SelectedFilterEx=con;
				$(TypeBtn).text(con);
				inptType.value=param;
				console.log(inptType.value);
			})
		}
	})
	SearchBtn.click(function(){
		ResultBody.empty();
		TableDiv.css('display','inline');
		console.log(SelectedAmt);
		console.log(SelectedFilter);
		console.log(SelectedFilterEx);
		let SearchVal=InpSearch.val();
		let RandomNum=[];
		function MakeTable(data){
			let cards=data.cards;
			console.log(data);
			console.log(data.cards.length);
			let coun =0;
			if(SelectedAmt=='All' || SelectedAmt>data.cards.length)
		 	for(let i=0;i<data.cards.length;i++){
		 		if(cards[i].supertype!="Pokémon")
		 			continue;
		 		let Details=[cards[i].name,cards[i].nationalPokedexNumber,
		 					cards[i].types[0],cards[i].rarity,cards[i].artist];
		 		let tr=document.createElement('tr');
		 		for(let j=0;j<5;j++){
		 			let td=document.createElement('td');
		 			let tx=document.createTextNode(Details[j]);
		 			td.append(tx);
		 			tr.append(td);
		 		}
		 		ResultBody.append(tr);
		 		coun++;
		 	}
		 	else{
		 		let length=data.cards.length;
		 		for(let i=0;i<SelectedAmt;i++){
		 			let Num=Math.floor(Math.random()*length);
		 			if(cards[Num].supertype!='Pokémon'){
		 				Num=Math.floor(Math.random()*length);
		 				i--;
		 			}
		 			console.log(Num);
		 			for(let j=i-1;j>=0;j--)
		 				if(Num==RandomNum[j] || cards[Num].supertype!='Pokémon'){
		 					Num=Math.floor(Math.random()*length);
		 					j++;
		 				}
		 			RandomNum[i]=Num;
		 		}
		 		for(let i=0;i<SelectedAmt;i++){
		 			let N=RandomNum[i];
		 			console.log(cards[N].name);
		 			let Details=[cards[N].name,cards[N].nationalPokedexNumber,
		 						cards[N].types[0],cards[N].rarity,cards[N].artist];
			 		let tr=document.createElement('tr');
			 		for(let j=0;j<5;j++){
			 			let td=document.createElement('td');
			 			let tx=document.createTextNode(Details[j]);
			 			td.append(tx);
			 			tr.append(td);
			 		}
		 			ResultBody.append(tr);
		 		}

		 	}
		 	console.log(coun);
		}
		function networkReq(SF,Value){
			$.ajax({
				url:`https://api.pokemontcg.io/v1/cards?${SF}=${Value}`,
				method:'get',
				success:function(data){
					console.log('OK');
					console.log(data);
					MakeTable(data);
				}
			})
		}
		if(count==1){
			networkReq(SelectedFilter,SelectedFilterEx);
		}
		else networkReq(SelectedFilter,SearchVal);
	})
})