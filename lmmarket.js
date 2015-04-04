var request = require('request');
var url = require('./_secret/lmurl.js');
var marketData = null;
var marketLastFetch = 0;
var marketCacheTime = 12 * 36e5;    // 12 hr in ms

function getNow() {
	return new Date() - 0;
}

function fetchMarket() {
	if (marketData.progress == 'fetching')
		return;
	console.log('Market data fetching. Cache time = ' + marketCacheTime);
	//mark current progress
	marketData.progress = 'fetching';
	return request.get(url.LM_MARKET, function(err, resp, body) {
		if (!err && resp.statusCode == 200) {
			try {
				var obj = JSON.parse(body);
			} catch (e) {
				console.error('Failed parsing Market JSON response!');
			}
			if (obj.status == 'ok') {
				console.info('Market data updated. len = ' + body.length);
				// overwrite data
				marketData = obj;
				// refresh time
				marketLastFetch = getNow();
			} else {
				console.warn('Market data fetching failed! status = ' + obj.status);
			}
		} else {
			console.warn('Market data fetching failed! code = ' + resp.statusCode);
		}
	});
}

module.exports = {
	init: function() {
		marketData = {
			progress: 'init',
			list: []
		};
		return fetchMarket();
	},
	fetch: function() {
		if(getNow() - marketLastFetch > marketCacheTime) {
			console.info('Market data expired.');
			fetchMarket();
		}
		return marketData;
	}
};
