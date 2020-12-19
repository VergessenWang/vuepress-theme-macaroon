---
# layout: layout
title: BM算法
date: 2019-11-27 23:43:22
tags:
- BM
categories:
- Algorithm
---

我表示看完这两个匹配算法，头顶有点凉...

BM算法与KMP算法的主要区别在于：采用**从右向左**进行字符的匹配比较。 

BM算法中的关键问题是， 如何确定**目标串**中的下一轮匹配的开始位置？即如何决定目标串中指针向右跳跃的距离？——利用P中的重复模式 **和 T中的失配字符**

假设出现失配时， T[i]≠P[k]。则 此时**坏字符为x(=T[i])**，**好后缀P’=P[(k+1) … (len(P)-1)]**（好后缀，是已匹配的部分字符串）

如何确定目标串中查找指针的移动距离dist[i]？

采用2种启发式方法：无需检查目标串中的所有字符即可查找到是否存在匹配子串。

- 启发式方法#1： 跳过字符（“坏字符”规则）
  - CharJump[x]：依据T中的坏字符x，计算T中查找指针的跳跃距离
- 启发式方法#2： 重复模式（“好后缀”规则）
  - MatchJump[k] ： 依据P中的失配位置k， 计算T中查找指针的跳跃距离

<!-- more -->

#### 基本步骤

Step1：**对于模式串P，计算CharJump[x]和MatchJump[k]**。
Step2: 将T与P的第一个字符对齐。
Step3: T与P进行从右向左的逐字符比较 ，直至找到一个不匹配字符或者P中所有字符都匹配成功。
Step4: 若出现失配，即存在T[i]≠P[k]，此时坏字符x=T[i]，好后缀P’=P[(k+1) … (len(P)-1)]。按如下规则计算 目标串T中查找指针向右移动dist[i]：

- 若此时T与P已有部分字符匹配（即存在“好后缀” ） 时， BM算法将采用2种启发式方法（即坏字符规则 和好后缀规则 ） ，计算dist[i]=**max(CharJump[x],MatchJump[k])**。
- 若不存在“好后缀”，则必定是在模式串P的最后一个字符处出现失配。此时应采用启发式方法#1： 跳过字符规则（“好后缀”规则），计算设置dist[i] =CharJump[x]。

Step5: 若(i+dist[i])≤Len(T)-1，则移动模式字符串P，使之与**T[i+dist[i]]**右对齐，重复Step3；否则，认为T中不存在与P匹配的子串，返回匹配失败。 

#### 坏字符的两种情况

1. 如果模式串中没有出现坏字符，那么从字符x开始的Len(P)个字符显然不可能与P匹配成功， 使目标串中查找指针直接跳过Len(P) 个字符。 即将**模式串整体挪到该字符之后**
2. 如果坏字符x在模式P中出现(假设P[j]==x)，则将目标串中查找指针移动CharJump[x]，使得下一轮匹配中将字符P[j]与坏字符x进行对齐。即该坏字符与模式串中**最后出现该字符的位置**对齐——因为是从右向左匹配
   - 关键问题是计算CharJump[x]
     -  若x在P中出现，假设p[j]==x，则CharJump[x]=Len(P)-**max(j)**-1 —— max计算最后位置
     - 否则， CharJump[x]=Len(P); 

注意： 模式串P右移距离**shift=dist[i]-Len(u)= CharJump[x]- (Len(P)-1-k)**  个字符。

在第二种情况下，无法保证模式串一定是向右移动的，**匹配可能会倒退，甚至进入死循环**，使匹配一直无法结束。如**坏字符出现在已经匹配的部分**——于是需要配合好后缀来保证向前滑动。

若利用“坏字符规则，目标串中查找指针的移动距离dist=0，那么此时失配处必定不是在模式串的最后一个字符处，即此时必定存在“好后缀”

#### 好后缀的三种情况

1. 好的后缀可以在模式串的后缀之前位置的字符串中找到，且该字符串的前一个字符≠P[k] ——中间重合
2. 好后缀的的后缀子串是模式串的前缀——首尾重合
3. 模式串中找不到子串和好后缀子串前缀, 将模式串整体挪到该字符之后

关键问题： 如何计算目标串中查找指针的移动距离MatchJump?

T中查找指针的移动距离dist≠模式串P的移动距离shift

T中查找指针的移动距离dist=模式串P的移动距离shift+好后缀的长度  —— 打破循环
Step1: MatchJump数组初始化：——默认不存在重复模式

- MatchJump[k]=2*Len(p)-k-1 = **Len(p)-k-1+Len(p)**;（k∈[0,Len(P)-2]）—— 已匹配部分长度 + 模式串长度
- MatchJump[Len(P)-1] = 1，最后一个特殊处理，即第一个失配因此只移动一位（意味着：此时没有好后缀）

Step2:若**存在好后缀**，则依据“好后缀规则 ” ， 重新调整
MatchJump[k]（k∈[0,Len(P)-2]） **（假定：好后缀P’为P[k+1]…P[Len(p)-1] ）**

- 规则1：若好后缀P’在P**中存在重复模式(注意是完全重复！)**，**且重复模式的前一个字符不等**，即P[t +1]…P[Len(p)-1-k+t ]== P[k+1]…P[Len(P)-1]且P[t]≠P[k]，则MatchJump(k)=**[Len(P)-1-k]+min(k-t)**——**要求计算重复模式的最小间隔，是因为可能有多个重复模式 **—— 已匹配部分长度 + 不等字符间距
- 规则2：若不满足规则1，且**P的前缀 为好后缀P’中的某个子后缀P"的重复模式**(部分重复)，即(P"=P[t] … P[Len(p)-1]==P[0] … P[Len(p)-1-t]（t>k+1)，则**MatchJump(k)=[Len(P)-1-k]+min(t)**
- 都不满足：MatchJump[k]=2*Len(p)-k-1 = **Len(p)-k-1+Len(p)**;

```c++
#include <algorithm>
#include <string>
#include <iostream>

using namespace std;
#define SIZE 256    //字符集字符数
void generateBadChar(char *b, int m, int *badchar)//(模式串b，模式串长度m，模式串的哈希表)
{
	int i, ascii;
	for (i = 0; i < SIZE; ++i)
	{
		badchar[i] = -1;//哈希表初始化为-1
	}
	for (i = 0; i < m; ++i)
	{
		ascii = int(b[i]);  //计算字符的ASCII值
		badchar[ascii] = i;//重复字符被覆盖，记录的是最后出现的该字符的位置		
	}
	// 打印一下badchar
	for (int j = 0; j < m; ++j)
	{
		int pos,jump;
		ascii = int(b[j]);
		pos = badchar[ascii] + 1;
		if (pos != 0) jump = m - pos;
		else jump = m;
		printf("模式串%s中第 %d 个字符 %c 最后出现的位置是 %d，charjmp值为%d\n", b, j + 1, b[j], pos,jump );
	}
}
void generateGS(char *b, int m, int *suffix, bool *prefix)//预处理模式串，填充suffix，prefix
{
	int i, j, k;
	for (i = 0; i < m; ++i)//两个数组初始化
	{
		suffix[i] = -1;
		prefix[i] = false;
	}
	for (i = 0; i < m - 1; ++i)//b[0,i]
	{
		j = i;
		k = 0;//公共后缀子串长度(模式串尾部取k个出来，分别比较)
		while (j >= 0 && b[j] == b[m - 1 - k])//与b[0,m-1]求公共后缀子串
		{
			--j;
			++k;
			suffix[k] = j + 1;
			//相同后缀子串长度为k时，该子串在b[0,i]中的起始下标
			// (如果有多个相同长度的子串，被赋值覆盖，存较大的)
		}
		if (j == -1)//查找到模式串的头部了
			prefix[k] = true;//如果公共后缀子串也是模式串的前缀子串
	}
}
int moveByGS(int j, int m, int *suffix, bool *prefix)//传入的j是坏字符对应的模式串中的字符下标
{
	int k = m - 1 - j;//好后缀长度
	if (suffix[k] != -1)//case1，找到跟好后缀一样的模式子串（多个的话，存的靠后的那个（子串起始下标））
		return j - suffix[k] + 1;
	for (int r = j + 2; r < m; ++r)//case2
	{
		if (prefix[m - r] == true)//m-r是好后缀的子串的长度，如果这个好后缀的子串是模式串的前缀子串
			return r;//在上面没有找到相同的好后缀下，移动r位，对齐前缀到好后缀
	}
	return m;//case3,都没有匹配的，移动m位（模式串长度）
}
int str_bm(char *a, int n, char *b, int m)//a表示主串，长n; b表示模式串,长m
{
	int *badchar = new int[SIZE];//记录模式串中每个字符最后出现的位置
	generateBadChar(b, m, badchar);     //构建坏字符哈希表

	int *suffix = new int[m];
	bool *prefix = new bool[m];
	generateGS(b, m, suffix, prefix);   //预处理模式串，填充suffix，prefix

	int i = 0, j, moveLen1, moveLen2;//j表示主串与模式串匹配的第一个字符
	while (i < n - m + 1)
	{
		for (j = m - 1; j >= 0; --j)  //模式串从后往前匹配
		{
			if (a[i + j] != b[j])
				break;  //坏字符对应模式串中的下标是j
		}
		if (j < 0)   //匹配成功
		{
			delete[] badchar;
			delete[] suffix;
			delete[] prefix;
			return i + 1;   //返回主串与模式串第一个匹配的字符的位置
		}
		//这里等同于将模式串往后滑动 j-badchar[int(a[i+j])] 位
		moveLen1 = j - badchar[int(a[i + j])];//按照坏字符规则移动距离
		moveLen2 = 0;


		if (j < m - 1)//如果有好后缀的话
		{
			moveLen2 = moveByGS(j, m, suffix, prefix);//按照好后缀规则移动距离
		}
		i = i + max(moveLen1, moveLen2);//取大的移动
	}
	delete[] badchar;
	delete[] suffix;
	delete[] prefix;
	return -1;
}

int main()
{
	string a , b ;
	cin >> a; // 目标串
	cin >> b; // 子串
	cout << a << "中第一次出现" << b << "的位置(从0开始)是：" << str_bm(&a[0], a.size(), &b[0], b.size());
	system("pause");
	return 0;
}
```

