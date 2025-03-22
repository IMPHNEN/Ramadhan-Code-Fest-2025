(* Pembuktian matematis dengan induksi di Coq *)
(* Jalankan di Jscoq apabila ingin dijalankan *)

Theorem adisi_id : forall n: nat, n + 0 = n.
Proof.
  intros n.
  induction n as [|n' IHn'].
  - reflexivity.
  - simpl. rewrite -> IHn'. reflexivity.
Qed.

Theorem jelas: forall n: nat, minus n n = 0.
Proof.
  intros n. induction n as [|n' IHn'].
  - reflexivity.
  - simpl. rewrite -> IHn'. reflexivity.
Qed.


(* Exercise *)
Theorem mul_0_r : forall n:nat,
  n * 0 = 0.
Proof.
  intros n. induction n as [|n' IHn'].
  - reflexivity.
  - simpl. rewrite -> IHn'. reflexivity.
Qed.


Theorem plus_n_Sm : forall n m : nat,
  S (n + m) = n + (S m).
Proof.
  intros m n.
  {
  induction m as [|m' IHm'].
  - simpl. reflexivity.
  - simpl. rewrite -> IHm'. reflexivity.
  }
Qed.


Theorem add_comm : forall n m : nat,
  n + m = m + n.
Proof.
  intros m n. induction n as [|n' IHn'].
  - simpl. rewrite -> adisi_id. reflexivity.
  - simpl. rewrite <- plus_n_Sm. rewrite -> IHn'. reflexivity.
Qed.


Theorem add_assoc : forall n m p : nat,
  n + (m + p) = (n + m) + p.
Proof.
  intros m n p.
  induction p as [|p' IHp'].
  - simpl. rewrite -> adisi_id. rewrite -> adisi_id. reflexivity.
  - simpl. rewrite <- plus_n_Sm. rewrite <- plus_n_Sm.
  rewrite <- plus_n_Sm. rewrite -> IHp'. reflexivity.
Qed.

(* Selesai *)

