#include <iostream>
#include <vector>
#include <bits/stdc++.h>
using namespace std;

int main() {
	int t;
	cin>>t;
	for(int i=0;i<t;i++){
	      vector<int> arr;
	      int n;
	      int temp,min;
	      int moves {0};
	    cin>>n;
	    int sum {0};
	    for(int j=0;j<n;j++){
	        cin>>temp;
	       arr.push_back(temp);
	       sum+=temp;
	    }
	    min=*min_element(arr.begin(), arr.end());
	    moves=sum-n*min;
	    cout<<moves;
	}
	return 0;
}